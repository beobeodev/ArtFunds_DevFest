//import ERC721 interface
import "./ERC721.sol";

pragma abicoder v2;
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
        mapping(uint256 => DigitalItem) listDigital;
        uint8 listSize;
    }

    uint256 public collectionCounter;
    mapping(address => Collection[]) public ownerCollections;
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
    }

    uint256 digitalItemCounter = 0;
    mapping(address => DigitalItem[]) public ownerDigitalItems;
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

    function updateCurrentOwnerDigitalItem(
        address _owner,
        address payable _newOwner,
        uint256 _tokenId
    ) public returns (bool success) {
        require(_owner != address(0x0));
        require(_newOwner != address(0x0));
        require(_tokenId >= 0);
        DigitalItem storage digitalItem = ownerDigitalItems[_owner][_tokenId];
        digitalItem.previousOwner = digitalItem.currentOwner;
        digitalItem.currentOwner = _newOwner;
        return true;
    }

    function updateInfoBasicDigitalItem(
        address _owner,
        uint256 _tokenId,
        string memory _name,
        uint256 _price,
        string memory _imageURL,
        uint256 _numberOfTransfers,
        bool _forSale
    ) public returns (bool success) {
        require(_owner != address(0x0));
        require(_tokenId >= 0);
        require(ownerDigitalItems[_owner].length > 0);
        DigitalItem storage digitalItem = ownerDigitalItems[_owner][_tokenId];
        digitalItem.imageURL = _imageURL;
        digitalItem.name = _name;
        digitalItem.price = _price;
        digitalItem.forSale = _forSale;
        digitalItem.numberOfTransfers = _numberOfTransfers;
        return true;
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
    ) public returns (bool success) {
        collectionCounter++;
        Collection storage collection = ownerCollections[msg.sender][
            collectionCounter
        ];
        collection.tokenId = collectionCounter;
        collection.imageURL = _imageURL;
        collection.name = _name;
        collection.description = _description;
        collection.listSize = 0;

        // ownerCollections[msg.sender].push(collection);

        emit CollectionCreated(
            collectionCounter,
            _imageURL,
            _name,
            msg.sender,
            _description
        );
        return true;
    }

    // function getCollections(address _owner)
    //     public
    //     view
    //     returns (Collection[] memory)
    // {
    //     require(_owner != address(0x0));
    //     require(ownerCollections[_owner].length > 0);
    //     return ownerCollections[_owner];
    // }

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

<<<<<<< HEAD
    function getCollectionCount(address _owner) public view returns (uint256 count) {
=======
    function updateCollection(
        uint256 _tokenId,
        string memory _imageURL,
        string memory _name,
        string memory _description,
        address _owner
    ) public returns (bool success) {
        require(_owner != address(0x0));
        require(_tokenId >= 0);
        require(ownerCollections[_owner].length > 0);
        Collection storage collection = ownerCollections[_owner][_tokenId];
        collection.imageURL = _imageURL;
        collection.name = _name;
        collection.description = _description;
        return true;
    }

    function deleteCollection(address _owner, uint256 _tokenId)
        public
        returns (bool success)
    {
        require(_owner != address(0x0));
        require(_tokenId >= 0);
        require(ownerCollections[_owner].length > 0);
        // uint256 rowToDelete = ownerCollections[_owner][_tokenId].index;
        delete ownerCollections[_owner][_tokenId];
        collectionCounter--;
        return true;
    }

    function getCollectionCount(address _owner) public view returns (uint256) {
>>>>>>> 4513547c9103a630b6245818b37020da7a1f718e
        require(_owner != address(0x0));
        return (collectionCounter);
        // return ownerCollections[_owner].length;
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
