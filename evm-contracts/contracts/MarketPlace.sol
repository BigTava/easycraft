// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/** @title Spare capacity marketplace
 *  @author Easycraft Team
 *  @notice This contract manages order payment and supplier escrow
 */

/* Errors */
error MarketPlace__IdIsRequired();
error MarketPlace__PriceMustBePositive();
error MarketPlace__CapacityDoesNotExist();
error MarketPlace__CapacityNotAvailable();

contract MarketPlace {
    //----------------- Type declarations -----------------

    struct Supplier {
        bytes32 supplierId;
        address payable supplier;
        bool available;
    }

    struct Capacity {
        bytes32 id;
        bytes32 supplierId;
        bool available;
        uint256 pricePerUnit;
        bytes32 orderId;
    }

    //----------------- State variables -------------------
    uint256 private immutable i_escrow_amount = 1000;

    mapping(bytes32 => Capacity) private s_suppliers;
    mapping(bytes32 => Capacity) public s_capacities;

    //----------------- Events ----------------------------
    event SupplierAdded(bytes32 supplierId, address supplier);
    event CapacityAdded(bytes32 id, bytes32 supplierId, uint256 pricePerUnit);
    event CapacityMatched(bytes32 id, bytes32 orderId);

    //----------------- Modifiers -------------------------
    modifier capacityExists(bytes32 _capacityId) {
        if (capacities[_capacityId].id == bytes32(0)) {
            revert MarketPlace__CapacityDoesNotExist();
        }
        _;
    }

    //----------------- Functions -------------------------
    constructor(uint256 _escrow_amount) {
        i_escrow_amount = _escrow_amount;
    }

    function addSupplier(
        bytes32 _supplierId,
        address _supplier,
    ) payable public {
        require(msg.value == i_escrow_amount, "Escrow not enough")
        s_suppliers[_supplierId] = Supplier(
            _supplierId,
            payable(_supplier),
            payable(msg.sender),
            true,
            _minPrice
        );

        emit CapacityAdded(_id, msg.sender, manufacturerId);
    }

    function addCapacity(bytes32 _id, uint256 _pricePerUnit, bytes32 supplierId) public {
        if (_id == bytes32(0)) {
            revert MarketPlace__IdIsRequired(); 
        }

        if (_pricePerUnit <= 0) {
            revert MarketPlace__PriceMustBePositive(); 
        }

        capacities[_id] = Capacity(_id, supplierId, true, _pricePerUnit, bytes(0));

        emit CapacityAdded(_id, msg.sender, manufacturerId);
    }

    function matchCapacity(bytes32 _orderId, bytes32 _capacityId, uint256 _amount) capacityExists(_capacityId) {
        Capacity storage s_capacity = s_capacities[_capacityId];
        if (capacity.available == false) {
            revert MarketPlace__CapacityNotAvailable();
        }
        capacity.available = false;

        capacity.supplier.transfer(s_capacity.pricePerUnit * _amount);
        capacity.orderId = _orderId;

        emit CapacityMatched(capacity.id, _orderId);
    }
}
