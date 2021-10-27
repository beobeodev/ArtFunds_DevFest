//import ERC721 interface
import "./ERC721.sol";

pragma solidity >=0.6.0 <0.8.0;

//implement
contract ArtFundsStorage is ERC721 {
    // this contract's token collection name
    string public collectionName;
    // this contract's token symbol
    string public collectionNameSymbol;

    struct Collection {
        uint256 tokenId;
        string imageURL;
        string name;
        string description;
        // DigitalItem[] digitalItems;
        // uint256 collectionPointer;
        // uint256[] digitalItemKeys;
        mapping(uint256 => DigitalItem) listDigital;
        uint8 listSize;
    }

    uint256 collectionCounter = 0;
    mapping(address => Collection[]) public ownerCollections;
    // mapping(address => Collection) public collectionStructs;
    // uint256[] collections;

    struct DigitalItem {
        uint256 tokenId;
        string name;
        address payable mintedBy;
        address payable currentOwner;
        address payable previousOwner;
        uint256 price;
        string imageURL;
        uint256 numberOfTransfers;
        bool forSale;
        // uint256 digitalItemPointer;
        // uint256 collectionKey;
    }

    uint256 digitalItemCounter = 0;
    mapping(address => DigitalItem[]) public ownerDigitalItems;
    // mapping(address => DigitalItem) public digitalItemStructs;
    // uint256[] digitalItems;

    event ItemCreated(
        uint256 id,
        string name,
        address mintedBy,
        address currentOwner,
        address previousOwner,
        uint256 price,
        string imageURL,
        uint256 numberOfTransfers,
        bool forSale
    );

    event ItemForSale(uint256 id, bool forSale);

    event CollectionCreated(
        uint256 tokenId,
        string imageURL,
        string name,
        address ownedBy,
        string description
    );

    // initialize contract while deployment with contract's collection name and token
    constructor() ERC721("ArtFunds Collection", "CB") {
        collectionName = name();
        collectionNameSymbol = symbol();
    }

    // uint256 public tokenCounter;

    // function getCollectionDigitalItemsCount(uint256 collectionId)
    //     public
    //     constant
    //     returns (uint256 digitalItemsCount)
    // {
    //     if (!isCollection(collectionId)) throw;
    //     return collectionStructs[collectionId].digitalItemKeys.length;
    // }

    // function getCollectionDigitalItemsAtIndex(uint256 collectionId, uint256 row)
    //     public
    //     constant
    //     returns (uint256 collectionKey)
    // {
    //     if (!isCollection(collectionId)) throw;
    //     return collectionStructs[collectionId].collectionKeys[row];
    // }

    // function createDigitalItem(uint256 digitalItemId, uint256 collectionId)
    //     onlyOwner
    //     returns (bool success)
    // {
    //     if (!isCollection(collectionId)) throw;
    //     if (isDigitalItem(digitalItemId)) throw;
    //     digitalItemStructs[digitalItemId].digitalItemPointer =
    //         digitalItems.push(digitalItemId) -
    //         1;
    //     digitalItemStructs[digitalItemId].collectionKey = collectionId;

    //     collectionStructs[collectionId].digitalItemKeyPointers[digitalItemId] =
    //         collectionStructs[collectionId].digitalItemKeys.push(
    //             digitalItemId
    //         ) -
    //         1;
    //     LogNewdigitalItem(msg.sender, digitalItemId, collectionId);
    //     return true;
    // }

    // mint a new digital item
    function mintDigitalItem(
        string memory _name,
        uint256 _price,
        string memory _imageURL,
        uint256 _numberOfTransfers,
        bool _forSale
    ) external {
        // check if thic fucntion caller is not an zero address account
        require(msg.sender != address(0));
        // increment counter
        digitalItemCounter++;
        // check if a token exists with the above token id => incremented counter
        require(!_exists(digitalItemCounter));

        // mint the token
        _mint(msg.sender, digitalItemCounter);

        DigitalItem memory newDigitalItem = DigitalItem(
            digitalItemCounter,
            _name,
            msg.sender,
            msg.sender,
            msg.sender,
            _price,
            _imageURL,
            0,
            true
        );
        ownerDigitalItems[msg.sender].push(newDigitalItem);
    }

    function getDigitalItem(uint256 _tokenId, address _owner)
        public
        view
        returns (
            string memory _name,
            address _mintedBy,
            address _currentOwner,
            address _previousOwner,
            uint256 _price,
            string memory _imageURL,
            uint256 _numberOfTransfers,
            bool _forSale
        )
    {
        require(_owner != address(0x0));
        require(_tokenId >= 0);
        require(ownerDigitalItems[_owner].length > 0);
        DigitalItem storage digitalItem = ownerDigitalItems[_owner][_tokenId];

        return (
            digitalItem.name,
            digitalItem.mintedBy,
            digitalItem.currentOwner,
            digitalItem.previousOwner,
            digitalItem.price,
            digitalItem.imageURL,
            digitalItem.numberOfTransfers,
            digitalItem.forSale
        );
    }

    function getDigitalItemCount(address _owner) public view returns (uint256) {
        require(_owner != address(0x0));
        return ownerDigitalItems[_owner].length;
    }

    //This function to create collection from address
    function createCollection(
        string memory _imageURL,
        string memory _name,
        string memory _description
    ) public {
        collectionCounter++;

        // DigitalItem[] memory temp;

        Collection storage collection = ownerCollections[msg.sender][collectionCounter];
        collection.tokenId = collectionCounter;
        collection.imageURL = _imageURL;
        collection.name = _name;
        collection.description = _description;
        collection.listSize = 0;
        // Collection(
        //     collectionCounter,
        //     _imageURL,
        //     _name,
        //     _description
        // );

        // ownerCollections[msg.sender].push(collection);
        
        emit CollectionCreated(
          collectionCounter,
          _imageURL,
          _name,
          msg.sender,
          _description
        );
    }

    function getCollection(uint256 _tokenId, address _owner)
        public
        view
        returns (
            string memory _imageURL,
            string memory _name,
            string memory _description
        )
    {
        require(_owner != address(0x0));
        require(_tokenId >= 0);
        require(ownerCollections[_owner].length > 0);
        Collection storage collection = ownerCollections[_owner][_tokenId];

        return (collection.imageURL, collection.name, collection.description);
    }

    function getCollectionCount(address _owner) public view returns (uint256) {
        require(_owner != address(0x0));
        return ownerCollections[_owner].length;
    }

    // struct Order {
    //     address maker;
    //     address taker;
    //     uint256 tokenId;
    // }

    // mapping(uint256 => Order) orders;

    // function makeOrder(uint256 _tokenId, uint256 _price) external {
    //     // validate nft
    //     // ...
    // }

    // function takeOrder(uint256 _tokenId) external {
    //     // check order exists
    //     // validate funds
    //     // transfer funds
    //     // transfer nft
    // }
}
