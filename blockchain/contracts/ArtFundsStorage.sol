//import ERC721 interface
import './ERC721.sol';
pragma solidity >=0.6.0 <0.8.0;

//implement 
contract ArtFundsStorage is ERC721 {
  // this contract's token collection name
  string public collectionName;
  // this contract's token symbol
  string public collectionNameSymbol;


  // initialize contract while deployment with contract's collection name and token
  constructor() ERC721("ArtFunds Collection", "AF") {
    collectionName = name();
    collectionNameSymbol = symbol();
  }
}