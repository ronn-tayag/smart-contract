// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    mapping(address => uint256) public balances;

    constructor() ERC20("RonnToken", "RON") Ownable(msg.sender){
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    // Mint function allows the owner to create new tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // function transfer(address _to, uint256 _value) public returns (bool) {
    //     require(balances[msg.sender] >= _value, "Insufficient balance");
    //     balances[msg.sender] -= _value;
    //     balances[_to] += _value;
    //     return true;
    // }
}