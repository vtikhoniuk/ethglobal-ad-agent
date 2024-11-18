// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
//import "hardhat/console.sol";

contract RequestMgmt {

    mapping(uint64 => string) private response;
    string private _prompt;

    /**** EXTERNAL ****/
    function submitRequest(
        string calldata prompt,
        uint64 nonce
    ) external {
        _prompt = prompt;
        response[nonce] = "";
    }

    function getResponse(
        uint64 nonce
    ) external view returns(string memory){
        return response[nonce];
    }
}