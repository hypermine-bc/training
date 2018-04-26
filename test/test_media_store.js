/**Test cases for Ethereum Media Store Contract.*/
'use strict';

import expectThrow from './helpers/expectThrow';
const MediaStore = artifacts.require('../contracts/MediaStore.sol');

contract('MediaStore', function (accounts) {
    let ms;
    let creator;
    let user;
    var  userList = [];

    before(async function () {
        // Instantiate the MediaStore Contract
        ms = await MediaStore.new();

        creator = accounts[0];
        user = accounts[1];
        userList[0] = accounts[2]; // A
        userList[1] = accounts[3]; // B
        userList[2] = accounts[4]; // C
        userList[3] = accounts[5]; // D
        userList[4] = accounts[6]; // E
        userList[5] = accounts[7]; // H

        await ms.createUser({from: creator});
        await ms.createUser({from: user});
    });

    describe("User", function() {
        it("should check if the user exists", async function() {
            let creatorExists = await ms.getUser(creator);
            let userExists = await ms.getUser(user);
            assert.isTrue(creatorExists);
            assert.isTrue(userExists);
        })
    })

    describe("Media", function() {
        it("should NOT add media file without value", async function() {
            await expectThrow(ms.addMedia("m001", "tag1|tag2", {from : creator}));
        });
        it("should NOT add media file without mediahash", async function() {
            await expectThrow(ms.addMedia("", "tag1|tag2", {from : creator, value :1}));
        });
        it("should NOT add media file without tagstring", async function() {
            await expectThrow(ms.addMedia("m001", "", {from : creator, value :1}));
        });
        it("should add a new media file", async function() {
            await ms.addMedia("m001", "tag1|tag2", {from : creator,value: 1});
            let [count, allMediaIds] = await ms.getUploadedMediaIds({from : creator});
            assert.equal(count,1);
        });
        
        it("should NOT allow multiple media with same id and same playlist", async function() {
            await expectThrow(ms.addMedia("m001", "tag1|tag2", {from : creator,value: 1}));
        });
        
        it("should allow multiple media files", async function() {
            await ms.addMedia( "m002",  "tag1|tag2", {from : creator, value: 1});
            await ms.addMedia( "m003",  "tag1|tag2", {from : creator, value: 1});
            await ms.addMedia( "m004",  "tag1", {from : creator, value: 1});
            await ms.addMedia( "m005",  "tag1", {from : creator, value: 1});
            
            await ms.addMedia( "m006",  "tag1", {from : userList[5], value: 1});
            let [mediaCount, mediaList] = await ms.getUploadedMediaIds({from : creator});
            assert.equal(mediaCount, 5);
        });
        
        it("should fetch media details by hash", async function() {
            let [creatorAddress, allTags, claps] = await ms.getMediaDetailByHash("m001");
            assert.equal(creatorAddress, creator);
            assert.equal(allTags, "tag1|tag2");
        });

        
        it("should create tags if NOT present", async function() {
            await ms.addMedia( "m007", "tag3", {from : creator, value: 1});
            let [mediaCount, mediaList] = await ms.getUploadedMediaIds( {from : creator});
            assert.equal(mediaCount, 6);
            let [tagCount, tagNames] = await ms.getTags();
            assert.equal(tagNames, "tag1|tag2|tag3");
            assert.equal(tagCount, 3);
        });
    });

    describe("Tags", function() {
        it("should get all tags", async function() {creator
            let [count, tagNames] = await ms.getTags();
            assert.equal(count, 3);
        });
        it("should get all media for tag", async function() {
            await ms.addMedia("m008", "tag3", {from : creator, value: 1});
            

            let [mediaCount, mediaList] = await ms.getMediaHashesByTag("tag3");
            assert.equal(mediaCount, 2)
            assert.equal(mediaList, "m007|m008")
        });
        it("should NOT get media for wrong tag", async function() {
            await expectThrow(ms.getMediaHashesByTag("tag123"));
        });
    });

    describe("Clap", function() {
        it("should allow user to clap", async function() {
            await ms.clap(creator, "m001", 1, {from: user, value: 1});
            let [creatorAddress, allTags, claps] = await ms.getMediaDetailByHash("m001");
            assert.equal(claps, 1);
        });
        
        it("should allow user multiple claps", async function() {
            await ms.clap(creator,  "m001", 3, {from: user, value: 1});
            let [creatorAddress, allTags, claps] = await ms.getMediaDetailByHash("m001");
            assert.equal(claps, 4);
        });
 
        it("should increase balance of creator", async function() {
            let prevBalOfUser = await web3.eth.getBalance(creator);
            await ms.clap(creator,  "m001", 1, {from: user, value: 1});
            let afterBalOfUser = await web3.eth.getBalance(creator);          
            assert.isAbove(afterBalOfUser, prevBalOfUser, 'Balance increased');
        });

        it("should NOT allow clap without value", async function() {
            await expectThrow(ms.clap(creator,  "m001", 3, {from: user}));
        });
    });

    describe("Share", function() {

        it("A should add a new media file", async function() {
            await ms.addMedia("MA001", "tag1", {from : userList[0],value: 1});
            let [count, allMediaIds] = await ms.getUploadedMediaIds({from : userList[0]});
            assert.equal(count,1);

        });

        describe("Vertical sharing cases...", function(){
            it("B should share file from A's page", async function() {
                await ms.shareMedia("MA001", userList[0], {from : userList[1]});
                let [shareCount, sharersAddrs] = await ms.getSharersByHash("MA001", {from : userList[1]});
                assert.equal(shareCount,1);
                assert.equal(sharersAddrs[0], userList[0]);

                let shareMediaId = await ms.getSharedMediaIds({from : userList[1]});
                assert.equal(shareMediaId, "MA001");
            });
            it("C should share file from B's page", async function() {
                await ms.shareMedia("MA001", userList[1], {from : userList[2]});
                let [shareCount, sharersAddrs] = await ms.getSharersByHash("MA001", {from : userList[2]});
                assert.equal(shareCount,2);
                assert.equal(sharersAddrs[0], userList[0]);
                assert.equal(sharersAddrs[1], userList[1]);

                let shareMediaId = await ms.getSharedMediaIds({from : userList[2]});
                assert.equal(shareMediaId, "MA001");
            });
            it("D should share file from C's page", async function() {
                await ms.shareMedia("MA001", userList[2], {from : userList[3]});
                let [shareCount, sharersAddrs] = await ms.getSharersByHash("MA001", {from : userList[3]});
                assert.equal(shareCount,3);
                assert.equal(sharersAddrs[0], userList[0]);
                assert.equal(sharersAddrs[1], userList[1]);
                assert.equal(sharersAddrs[2], userList[2]);

                let shareMediaId = await ms.getSharedMediaIds({from : userList[1]});
                assert.equal(shareMediaId, "MA001");
            });
        })

        describe("Horizontal sharing cases...", function(){
            it("B should NOT share file from A's page", async function() {
                await expectThrow(ms.shareMedia("MA001", userList[0], {from : userList[1]}));
            });
            it("C should NOT share file from B's page", async function() {
                await expectThrow(ms.shareMedia("MA001", userList[1], {from : userList[2]}));
            });
            it("E should share file from A's page", async function() {
                await ms.shareMedia("MA001", userList[0], {from : userList[4]});
                let [shareCount, sharersAddrs] = await ms.getSharersByHash("MA001", {from : userList[4]});
                assert.equal(shareCount,1);
                assert.equal(sharersAddrs[0], userList[0]);

                let shareMediaId = await ms.getSharedMediaIds({from : userList[1]});
                assert.equal(shareMediaId, "MA001");
            });
            it("should return total sharing count of media", async function() {
                let shareCount = await ms.getTotalShareCountByHash("MA001", {from : userList[4]});
                assert.equal(shareCount,4);
            });
        })

    });

    describe("Cash split equally between last share and creator on clapping", function() {

        it("D when claps on MA001 in C's page, A's balance should increase", async function() {
                
            let prevBalOfA = await web3.eth.getBalance(userList[0]);
                          
            await ms.clap(userList[2],  "MA001", 1, {from: user, value: 2});
            let [creatorAddress, allTags, claps] = await ms.getMediaDetailByHash("MA001");
            assert.equal(claps, 1);
            assert.equal(creatorAddress, userList[0]);

            let afterBalOfA = await web3.eth.getBalance(userList[0]);          
            assert.isAbove(afterBalOfA, prevBalOfA, 'Balance increased');
        });

        it("D when claps on MA001 in C's page, C's balance should increase", async function() {
                
            let prevBalOfC = await web3.eth.getBalance(userList[2]);
                          
            await ms.clap(userList[2],  "MA001", 1, {from: user, value: 2});
            let [creatorAddress, allTags, claps] = await ms.getMediaDetailByHash("MA001");
            assert.equal(claps, 2);
            assert.equal(creatorAddress, userList[0]);

            let afterBalOfC = await web3.eth.getBalance(userList[2]);          
            assert.isAbove(afterBalOfC, prevBalOfC, 'Balance increased');
        });

        it("D when claps on MA001 in C's page, B's balance should same", async function() {
                
            let prevBalOfB = await web3.eth.getBalance(userList[1]);
            //console.log('After balance :' + web3.fromWei(prevBalOfB,"ether"))
            
            await ms.clap(userList[2],  "MA001", 1, {from: user, value: 2});
            let [creatorAddress, allTags, claps] = await ms.getMediaDetailByHash("MA001");
            assert.equal(claps, 3);
            assert.equal(creatorAddress, userList[0]);

            let afterBalOfB = await web3.eth.getBalance(userList[1]);          
            //console.log('After balance :' + web3.fromWei(afterBalOfB,"ether"))
            assert.equal(web3.fromWei(afterBalOfB,"ether").toString(), web3.fromWei(prevBalOfB, "ether").toString());
        });
         
    });
    function addBalances(web3,firstVal, secondVal){
        return (parseFloat(web3.fromWei(firstVal, "ether"))) + (parseFloat(web3.fromWei(secondVal,"ether")));
    }
})
