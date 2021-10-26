//import ERC721 interface
import "./ERC721.sol";

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

    struct DigitalItem {
        uint256 tokenId;
        string tokenName;
        string tokenURI;
        string name;
        address payable mintedBy;
        address payable currentOwner;
        address payable previousOwner;
        uint256 price;
        uint256 numberOfTransfers;
        bool forSale;
    }
    struct Collection {
        uint256 tokenId;
        string tokenName;
        string tokenURI;
        string name;
        address mintedBy;
        address Owner;
        uint256 numberOfTransfers;
        uint256 digitalItemCount;
        DigitalItem[] digitalItems;
    }

    // This declares a state variable that
    // stores a `Collection` struct for each possible address.
    mapping(address => Collection) public collections;
    mapping(address => DigitalItem) public digitalItems;
    // A dynamically-sized array of `Collection` structs.
    Collection[] public collections;
}
