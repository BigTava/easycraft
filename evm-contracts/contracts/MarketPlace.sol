pragma solidity ^0.8.0;

contract MarketPlace {
    struct Capacity {
        bytes32 id;
        bytes32 manufacturerId;
        address payable supplier;
        bool available;
        uint256 minPrice;
    }

    struct Bid {
        uint id;
        bytes32 capacityId;
        address bidder;
        uint amount;
        bool active;
    }

    mapping(bytes32 => Capacity) public capacities;
    mapping(bytes32 => Bid[]) public capacityBids;

    event CapacityAdded(bytes32 id, address supplier, bytes32 manufacturerId);
    event BidPlaced(uint id, bytes32 capacityId, address bidder, uint amount);
    event BidWithdrawn(uint id, bytes32 capacityId, address bidder);
    event BidAccepted(uint id, bytes32 capacityId, address bidder, uint amount);
    event CapacityPurchased(bytes32 id, address buyer, bytes32 manufacturerId);

    modifier capacityExists(bytes32 _capacityId) {
        require(capacities[_capacityId].id != bytes32(0), "Capacity does not exist.");
        _;
    }

    function addCapacity(bytes32 _id, uint _minPrice, bytes32 manufacturerId) public {
        require(_id != bytes32(0), "Capacity ID is required.");
        require(_minPrice > 0, "Capacity price must be greater than zero.");

        capacities[_id] = Capacity(_id, manufacturerId, payable(msg.sender), true, _minPrice);

        emit CapacityAdded(_id, msg.sender, manufacturerId);
    }

    function placeBid(bytes32 _capacityId) public payable capacityExists(_capacityId) {
        require(capacities[_capacityId].available, "Capacity is not available.");
        require(msg.value > 0, "Bid amount must be greater than zero.");
        require(capacities[_capacityId].minPrice >= msg.value, "Bid amount must be greater than or equal to the minimum price.");

        capacityBids[_capacityId].push(Bid(capacityBids[_capacityId].length + 1, _capacityId, msg.sender, msg.value, true));

        emit BidPlaced(capacityBids[_capacityId].length, _capacityId, msg.sender, msg.value);
    }

    function withdrawBid(bytes32 _capacityId) public capacityExists(_capacityId) {
        Bid[] storage bids = capacityBids[_capacityId];
        require(bids.length > 0, "No bids exist for the capacity.");

        Bid storage bid = bids[bids.length - 1];
        require(bid.bidder == msg.sender, "Only the bidder can withdraw their bid.");
        require(bid.active, "Bid has already been withdrawn.");

        bid.active = false;
        payable(msg.sender).transfer(bid.amount);

        emit BidWithdrawn(bid.id, _capacityId, msg.sender);
    }

    function acceptBid(bytes32 _capacityId, uint _bidId) public payable capacityExists(_capacityId) {
        Capacity storage capacity = capacities[_capacityId];
        require(capacity.available, "Capacity is not available.");

        Bid[] storage bids = capacityBids[_capacityId];
        require(_bidId > 0 && _bidId <= bids.length, "Invalid bid ID.");

        Bid storage bid = bids[_bidId - 1];
        require(bid.active, "Bid is no longer active.");

        capacity.available = false;

        for (uint i = 0; i < bids.length; i++) {
            if (i != _bidId - 1) {
                bids[i].active = false;
            }
        }

        capacity.supplier.transfer(bid.amount);
        emit BidAccepted(_bidId, _capacityId, bid.bidder, bid.amount);
        emit CapacityPurchased(capacity.id, bid.bidder, capacity.manufacturerId);
    }
}
