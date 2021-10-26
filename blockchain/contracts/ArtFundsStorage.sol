//import ERC721 interface
import "./ERC721.sol";

pragma solidity >=0.6.0 <0.8.0;

//implement
contract ArtFundsStorage is ERC721 {
    // this contract's token collection name
    string public collectionName;
    // this contract's token symbol
    string public collectionNameSymbol;

    struct DigitalItem {
        uint256 tokenId;
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
        string name;
        uint256 digitalItemCount;
        DigitalItem[] digitalItems;
    }
    // A dynamically-sized array of `Collection` structs.
    Collection[] public collections;
    DigitalItem[] public digitalItems;

    struct Order {
        address maker;
        address taker;
        uint256 tokenId;
    }
    mapping(uint256 => Order) orders;

    function makeOrder(uint256 _tokenId, uint256 _price) external {
        // validate nft
        // ...
    }

    function takeOrder(uint256 _tokenId) external {
        // check order exists
        // validate funds
        // transfer funds
        // transfer nft
    }

    // map cryptoboy's token id to crypto boy
    mapping(uint256 => DigitalItem) public allDigitalItems;
    mapping(uint256 => Collection) public allCollections;
    // check if token name exists
    mapping(string => bool) public tokenNameExists;
    mapping(string => bool) public tokenURIExists;
    // This declares a state variable that
    // stores a `Collection` struct for each possible address.
    mapping(address => Collection[]) public collectionn;
    mapping(address => DigitalItem[]) public digitalItemm;

    // function setDigitalItem(
    //     address _address,
    //     uint256 _tokenId,
    //     string memory _tokenName,
    //     string memory _tokenURI,
    //     string memory _name,
    //     address _mintedBy,
    //     address _currentOwner,
    //     address _previousOwner,
    //     uint256 _price,
    //     uint256 _numberOfTransfers,
    //     bool _forSale
    // ) internal {
    //     digitalItem[_address] = DigitalItem(
    //         _tokenId,
    //         _tokenName,
    //         _tokenURI,
    //         _name,
    //         _mintedBy,
    //         _currentOwner,
    //         _previousOwner,
    //         _price,
    //         _numberOfTransfers,
    //         _forSale
    //     );
    //     digitalItems.push(_address) - 1;
    //     // console.log(')
    // }

    // initialize contract while deployment with contract's collection name and token
    constructor() ERC721("ArtFunds Collection", "AF") {
        collectionName = name();
        collectionNameSymbol = symbol();
    }
}
