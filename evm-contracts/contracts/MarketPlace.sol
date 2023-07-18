pragma solidity ^0.8.0;

contract MarketPlace {
    struct Product {
        bytes32 id;
        string name;
        uint price;
        address payable supplier;
        bool available;
    }

    struct Bid {
        uint id;
        bytes32 productId;
        address bidder;
        uint amount;
        bool active;
    }

    mapping(bytes32 => Product) public products;
    mapping(bytes32 => Bid[]) public productBids;

    event ProductAdded(bytes32 id, string name, uint price, address supplier);
    event BidPlaced(uint id, bytes32 productId, address bidder, uint amount);
    event BidWithdrawn(uint id, bytes32 productId, address bidder);
    event BidAccepted(uint id, bytes32 productId, address bidder, uint amount);
    event ProductPurchased(bytes32 id, string name, uint price, address buyer);

    modifier productExists(bytes32 _productId) {
        require(products[_productId].price > 0, "Product does not exist.");
        _;
    }

    function addProduct(bytes32 _id, string memory _name, uint _price) public {
        require(_id != bytes32(0), "Product ID is required.");
        require(bytes(_name).length > 0, "Product name is required.");
        require(_price > 0, "Product price must be greater than zero.");

        products[_id] = Product(_id, _name, _price, payable(msg.sender), true);

        emit ProductAdded(_id, _name, _price, msg.sender);
    }

    function placeBid(bytes32 _productId) public payable productExists(_productId) {
        require(products[_productId].available, "Product is not available.");
        require(msg.value > 0, "Bid amount must be greater than zero.");

        productBids[_productId].push(Bid(productBids[_productId].length + 1, _productId, msg.sender, msg.value, true));

        emit BidPlaced(productBids[_productId].length, _productId, msg.sender, msg.value);
    }

    function withdrawBid(bytes32 _productId) public productExists(_productId) {
        Bid[] storage bids = productBids[_productId];
        require(bids.length > 0, "No bids exist for the product.");

        Bid storage bid = bids[bids.length - 1];
        require(bid.bidder == msg.sender, "Only the bidder can withdraw their bid.");
        require(bid.active, "Bid has already been withdrawn.");

        bid.active = false;
        payable(msg.sender).transfer(bid.amount);

        emit BidWithdrawn(bid.id, _productId, msg.sender);
    }

    function acceptBid(bytes32 _productId, uint _bidId) public payable productExists(_productId) {
        Product storage product = products[_productId];
        require(product.available, "Product is not available.");

        Bid[] storage bids = productBids[_productId];
        require(_bidId > 0 && _bidId <= bids.length, "Invalid bid ID.");

        Bid storage bid = bids[_bidId - 1];
        require(bid.active, "Bid is no longer active.");

        product.available = false;

        for (uint i = 0; i < bids.length; i++) {
            if (i != _bidId - 1) {
                bids[i].active = false;
            }
        }

        product.supplier.transfer(bid.amount);
        emit BidAccepted(_bidId, _productId, bid.bidder, bid.amount);
        emit ProductPurchased(product.id, product.name, product.price, bid.bidder);
    }
}
