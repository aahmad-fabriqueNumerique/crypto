//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract SimpleContract{

    string private _message;

    event messageChanged(string message);

    constructor(string memory message)
    {
        _message = message;
        emit messageChanged(_message);
    }

    function getMessage() public view returns (string memory)
    {
        return _message;
    }

    function setMessage(string memory message) public 
    {
        _message = message;
        emit messageChanged(_message);
    }
}