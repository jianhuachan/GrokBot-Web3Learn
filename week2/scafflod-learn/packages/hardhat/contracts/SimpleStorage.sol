// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract SimpleStorage {
    uint storedData;

    event ValueChange(address indexed sender, uint indexed oldValue, uint indexed newValue);

    function set(uint x) public {
        uint oldValue = storedData;

        storedData = x;

        emit ValueChange(msg.sender, oldValue, x);
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
