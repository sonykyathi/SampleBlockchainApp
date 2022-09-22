// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ArtManagement {

  event AddArt(address recipient, uint artId);
  event SetFinished(uint artId, bool finished);

  struct Art {
    uint id;
    string name;
    uint age;
    string bread;
    bool finished;
  }

  Art[] private artList;

  // Mapping of Art id to the wallet address of the user adding the new art under their name
  mapping(uint256 => address) artToOwner;

  function addArt(string memory name, uint16 age, string memory bread, bool finished) external {
    uint artId = artList.length;
    artList.push(Art(artId, name, age, bread, finished));
    artToOwner[artId] = msg.sender;
    emit AddArt(msg.sender, artId);
  }

  function _getArtList(bool finished) private view returns (Art[] memory) {
    Art[] memory temporary = new Art[](artList.length);
    uint counter = 0;
    for(uint i=0; i<artList.length; i++) {
      if(artToOwner[i] == msg.sender &&
        artList[i].finished == finished
      ) {
        temporary[counter] = artList[i];
        counter++;
      }
    }

    Art[] memory result = new Art[](counter);
    for(uint i=0; i<counter; i++) {
      result[i] = temporary[i];
    }
    return result;
  }

  function getFinishedArts() external view returns (Art[] memory) {
    return _getArtList(true);
  }

  function getUnfinishedArts() external view returns (Art[] memory) {
    return _getArtList(false);
  }

  function setFinished(uint artId, bool finished) external {
    if (artToOwner[artId] == msg.sender) {
      artList[artId].finished = finished;
      emit SetFinished(artId, finished);
    }
  }

}

