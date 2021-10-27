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
      uint256 itemId;
      string name;
      address payable mintedBy;
      address payable currentOwner;
      address payable previousOwner;
      uint256 price;
      uint256 numberOfTransfers;
      bool forSale;
    }

    struct Collection {
      uint256 collectionId;
      string name;
      uint256 digitalItemCount;
      DigitalItem[] digitalItems;
    }

    //total number of collection created
    uint256 public collectionCounter;
    //total number of item minted
    uint256 public itemCounter;
    
    // // A dynamically-sized array of `Collection` structs.
    // Collection[] public collections;
    // DigitalItem[] public digitalItems;

    struct Order {
      address maker;
      address taker;
      uint256 tokenId;
    }
    
    // map token id to DigitalItem
    mapping(uint256 => DigitalItem) public allDigitalItems;
    // map token id to Collection
    mapping(uint256 => Collection) public allCollections;

    mapping(uint256 => Order) orders;

    //This funtcion to create collection 
    function createCollection(string _name, string ) external {
      ++collectionCounter;
      allCollections[collectionCounter] = Collection(
        
      )
    }

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
