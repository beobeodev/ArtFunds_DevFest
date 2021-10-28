//import ERC721 interface
import "./ERC721.sol";
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

//implement
contract ArtFundsStorage is ERC721 {
    // this contract's token collection name
    string public collectionName;
    // this contract's token symbol
    string public collectionNameSymbol;
    address payable public ARTFUNDS;
    struct Collection {
        uint256 tokenId;
        string imageURL;
        string name;
        string description;
    }

    uint256 public collectionCounter;
    mapping(address => Collection[]) public ownerCollections;

    struct DigitalItem {
        uint256 tokenId;
        uint256 collectionID;
        string name;
        uint256 price;
        string itemURL;
        address payable mintedBy;
        address payable currentOwner;
        // address payable previousOwner;
        uint256 numberOfTransfers;
        bool forSale;
    }

    uint256 public digitalItemCounter;
    mapping(address => DigitalItem[]) public ownerDigitalItems;

    event ItemCreated(
        uint256 id,
        uint256 belongByColID,
        string name,
        address mintedBy,
        address currentOwner,
        uint256 price,
        string itemURL,
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
        ARTFUNDS = address(uint256(0xb6dC743c59122F7b2F0734c6CBe04b2B7155B24e));
    }

    // mint a new digital item
    function mintDigitalItem(
        uint256 _collectionID,
        string memory _name,
        uint256 _price,
        string memory _itemURL,
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
        // set token URL (bind token id with the passed in token URL)
        _setTokenURI(digitalItemCounter, _itemURL);

        DigitalItem memory newDigitalItem = DigitalItem(
            digitalItemCounter,
            _collectionID,
            _name,
            _price,
            _itemURL,
            // _tech,
            // _material,
            // _color,
            // _field,
            // _imageURL,
            // _description,
            msg.sender,
            msg.sender,
            0,
            _forSale
        );
        ownerDigitalItems[msg.sender].push(newDigitalItem);
    }

    function updateInfoBasicDigitalItem(
        address _owner,
        uint256 _tokenId,
        uint256 _newCollectionID,
        string memory _name,
        uint256 _price,
        string memory _itemURL,
        uint256 _numberOfTransfers,
        bool _forSale
    ) public returns (bool success) {
        require(_exists(_tokenId));
        require(_exists(_newCollectionID));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == _owner);
        DigitalItem memory digitalItem = ownerDigitalItems[_owner][_tokenId];
        digitalItem.itemURL = _itemURL;
        digitalItem.name = _name;
        digitalItem.price = _price;
        digitalItem.forSale = _forSale;
        digitalItem.collectionID = _newCollectionID;
        digitalItem.numberOfTransfers = _numberOfTransfers;
        ownerDigitalItems[_owner][_tokenId] = digitalItem;
        return true;
    }

    function getDigitalItem(uint256 _itemID, address _owner)
        public
        view
        returns (
            uint256 _tokenId,
            uint256 _collectionID,
            string memory _name,
            uint256 _price,
            string memory _itemURL,
            uint256 numberOfTransfers,
            bool _forSale
        )
    {
        require(_owner != address(0x0));
        require(_collectionID >= 0);
        require(ownerDigitalItems[_owner].length > 0);
        DigitalItem memory digitalItem = ownerDigitalItems[_owner][_itemID];

        return (
            digitalItem.tokenId,
            digitalItem.collectionID,
            digitalItem.name,
            digitalItem.price,
            digitalItem.itemURL,
            digitalItem.numberOfTransfers,
            digitalItem.forSale
        );
    }

    function getDigitalItemCount(address _owner)
        public
        view
        returns (uint256 count)
    {
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
        Collection memory collection = Collection(
            collectionCounter,
            _imageURL,
            _name,
            _description
        );
        ownerCollections[msg.sender].push(collection);

        emit CollectionCreated(
            collectionCounter,
            _imageURL,
            _name,
            msg.sender,
            _description
        );
        return true;
    }

    function getCollection(uint256 _tokenId, address _owner)
        public
        view
        returns (
            uint256 _id,
            string memory _imageURL,
            string memory _name,
            string memory _description
        )
    {
        Collection memory collection = ownerCollections[_owner][_tokenId];

        return (
            collection.tokenId,
            collection.imageURL,
            collection.name,
            collection.description
        );
    }

    // // function updateCollection(
    // //     uint256 _tokenId,
    // //     string memory _imageURL,
    // //     string memory _name,
    // //     string memory _description,
    // //     address _owner
    // // ) public returns (bool success) {
    // //     require(_owner != address(0x0));
    // //     require(_tokenId >= 0);
    // //     require(ownerCollections[_owner].length > 0);
    // //     Collection storage collection = ownerCollections[_owner][_tokenId];
    // //     collection.imageURL = _imageURL;
    // //     collection.name = _name;
    // //     collection.description = _description;
    // //     return true;
    // // }

    function getCollectionCount(address _owner)
        public
        view
        returns (uint256 count)
    {
        return ownerCollections[_owner].length;
    }

    function getDigitalItemOwnerCount(address _owner)
        public
        view
        returns (uint256 count)
    {
        return ownerDigitalItems[_owner].length;
    }

    // by a token by passing in the token's id
    function buyItem(uint256 _tokenId) public payable returns (bool success) {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0x0));
        // check if the token id of the token being bought exists or not
        require(_exists(_tokenId));
        // get the token's owner
        address tokenOwner = ownerOf(_tokenId);
        // token's owner should not be an zero address account
        require(tokenOwner != address(0));
        // the one who wants to buy the token should not be the token's owner
        require(tokenOwner != msg.sender);
        // get that token from all crypto boys mapping and create a memory of it defined as (struct => digitalItem)
        DigitalItem memory digitalItem = ownerDigitalItems[tokenOwner][
            _tokenId
        ];
        // price sent in to buy should be equal to or more than the token's price
        require(msg.value >= digitalItem.price);
        // token should be for sale
        require(digitalItem.forSale);
        // transfer the token from owner to the caller of the function (buyer)
        _transfer(tokenOwner, msg.sender, _tokenId);
        // get owner of the token
        address payable sendTo = digitalItem.currentOwner;
        // get guy who mint this token
        address payable sendToRoot = digitalItem.mintedBy;
        // send token's worth of ethers to the owner
        sendTo.transfer((msg.value * 95) / 100);
        sendToRoot.transfer((msg.value * 3) / 100);
        // send worth to marketplace
        ARTFUNDS.transfer((msg.value * 2) / 100);
        // update the token's previous owner
        // digitalItem.previousOwner = digitalItem.currentOwner;
        // update the token's current owner
        digitalItem.currentOwner = msg.sender;
        // update the how many times this token was transfered
        digitalItem.numberOfTransfers += 1;
        // set and update that token in the mapping
        ownerDigitalItems[msg.sender][_tokenId] = digitalItem;
        return true;
    }

    function changeItemPrice(uint256 _tokenId, uint256 _newPrice)
        public
        returns (bool success)
    {
        // require caller of the function is not an empty address
        require(msg.sender != address(0x0));
        // require that token should exist
        require(_exists(_tokenId));
        // get the token's owner
        address tokenOwner = ownerOf(_tokenId);
        // check that token's owner should be equal to the caller of the function
        require(tokenOwner == msg.sender);
        // get that token from all crypto boys mapping and create a memory of it defined as (struct => digitalItem)
        DigitalItem memory digitalItem = ownerDigitalItems[tokenOwner][
            _tokenId
        ];
        // update token's price with new price
        digitalItem.price = _newPrice;
        // set and update that token in the mapping
        ownerDigitalItems[tokenOwner][_tokenId] = digitalItem;
        return true;
    }

    // switch between set for sale and set not for sale
    // function toggleForSale(uint256 _tokenId) public returns (bool statusSale) {
    //     // require caller of the function is not an empty address
    //     require(msg.sender != address(0));
    //     // require that token should exist
    //     require(_exists(_tokenId));
    //     // get the token's owner
    //     address tokenOwner = ownerOf(_tokenId);
    //     // check that token's owner should be equal to the caller of the function
    //     require(tokenOwner == msg.sender);
    //     // get that token from all crypto boys mapping and create a memory of it defined as (struct => digitalItem)
    //     DigitalItem memory digitalItem = ownerDigitalItems[tokenOwner][
    //         _tokenId
    //     ];
    //     // if token's forSale is false make it true and vice versa
    //     if (digitalItem.forSale) {
    //         digitalItem.forSale = false;
    //     } else {
    //         digitalItem.forSale = true;
    //     }
    //     // set and update that token in the mapping
    //     ownerDigitalItems[tokenOwner][_tokenId] = digitalItem;
    //     return digitalItem.forSale;
    // }
}
