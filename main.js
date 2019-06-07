/*
Coded by Habibie
habibieamrullah@gmail.com
*/

//App Data
var appData = { 
	title : "runfingersrun", 
	highscore : 100
}

if(localStorage.getItem(appData.title) !== null){
	appData = JSON.parse(localStorage.getItem(appData.title))
}else{
	saveData()
}

function saveData(){
	localStorage.setItem(appData.title, JSON.stringify(appData))
	try {
		cl.update(appData.highscore)
		setTimeout(function(){
			cl.showlead()
		}, 1500)
	} catch (e) {
		console.log(e)
	}
	
}

//VARS
//var baseWidth = 920
var baseWidth = window.innerWidth
var screenRatio = window.innerWidth/window.innerHeight
//var gameHeight = baseWidth/screenRatio
var gameHeight = window.innerHeight
//var gameHeight = window.innerHeight


var game = new Phaser.Game(baseWidth, gameHeight, Phaser.AUTO, pgame)

var ZKGame = {}
var appimages
var apptexts

ZKGame.LogoIntro = {
	preload : function(){
		game.load.image("logo", "assets/zkcs.png")
	},
	create : function(){
		game.stage.backgroundColor = "#ffffff";
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		var zkLogo = game.add.sprite(game.world.centerX, game.world.centerY, "logo")
		zkLogo.anchor.setTo(.5, .5)
		zkLogo.scale.setTo(0.5)
		game.camera.flash(0x000000, 1000)
		setTimeout(function(){
			game.state.start("Main")
		}, 4000)
	}
}

ZKGame.Main = {
	preload : function(){
		game.load.image("tchecker", "assets/tchecker.png")
	},
	create : function(){
		//this.menubg = game.add.sprite(game.width/2, game.height/2.75, "menubg")
		//this.menubg.anchor.setTo(.5, .5)
		//this.menubg.scale.setTo(game.width/720)
		//this.tchecker = game.add.tileSprite(0, 0, game.width, game.height, "tchecker")
		//game.stage.backgroundColor = "#000000";
		$("#ui").show()
		$("#menubar").show()
		//$("#btnsaveimage").show()
		$("#bglist").slideToggle()
		$("#textprop").slideToggle()
		appimages = game.add.group()
		apptexts = game.add.group()
	}
}

game.state.add("LogoIntro", ZKGame.LogoIntro)
game.state.add("Main", ZKGame.Main)
game.state.start("LogoIntro")


function listimgs(type, x){
	var data = ""
	for(var i = 1; i <= x; i++){
		data += "<img class='imglist' src='assets/"+type+i+".jpg' width='64' onclick=\"placeImage('"+type+"', "+i+")\">"
	}
	$("#"+type+"list").html(data)
}

var iid = 0

function placeImage(type, x){
	game.load.image(type+x, "assets/"+type+x+".jpg")
	game.load.start()
	var newsprite = appimages.create(game.width/2, game.height/2, type+x);
	newsprite.iid = iid
	iid++
	newsprite.inputEnabled = true
	newsprite.input.enableDrag()
	//newsprite.events.onDragStop.add(onTileDrop, newsprite)
	newsprite.events.onInputDown.add(showController, newsprite)
	newsprite.anchor.setTo(.5)
	newsprite.prop = {
		scale : 1
	}
	$("#ui").hide()
	showController(newsprite)
}


var tid = 0
var cuscolor = ""
var cusalignment = "center"

function setalign(n){
	switch(n){
		case 1 :
			cusalignment = "left"
			break
		case 2 :
			cusalignment = "center"
			break
		case 3 :
			cusalignment = "right"
			break
	}
}

function placeText(){
	var txt = $("#textinput").val()
	if(txt != ""){
		$("#textinput").val("")
		if(cuscolor == "")
			cuscolor = "#000000"
		var newtext = apptexts.add(game.make.text(game.width/2, game.height/2, txt, { font: "114px Arial", fill : cuscolor, align : cusalignment}))
		newtext.tid = tid
		tid++
		newtext.inputEnabled = true
		newtext.input.enableDrag()
		//newsprite.events.onDragStop.add(onTileDrop, newtext)
		newtext.events.onInputDown.add(showTextController, newtext)
		newtext.anchor.setTo(.5)
		newtext.prop = {
			scale : 1
		}
		$("#ui").hide()
		showTextController(newtext)
	}
}

function setcuscol(c){
	cuscolor = c
}

function showController(img){
	$("#controller-left").hide()
	$("#controller-right").hide()
	$("#controller-right").fadeIn()
	$("#btnscaleup").attr({ "onclick" : "scaleup("+img.iid+")" })
	$("#btnscaledown").attr({ "onclick" : "scaledown("+img.iid+")" })
	$("#controller-left").fadeIn()
	$("#btndelete").attr({ "onclick" : "deleteimage("+img.iid+")" })
	setDlButton()
}

function showTextController(txt){
	$("#controller-left").hide()
	$("#controller-right").hide()
	$("#controller-right").fadeIn()
	$("#btnscaleup").attr({ "onclick" : "scaleupT("+txt.tid+")" })
	$("#btnscaledown").attr({ "onclick" : "scaledownT("+txt.tid+")" })
	$("#controller-left").fadeIn()
	$("#btndelete").attr({ "onclick" : "deleteT("+txt.tid+")" })
	setDlButton()
}

function scaleup(x){
	appimages.children[x].prop.scale += 0.05
	appimages.children[x].scale.x = appimages.children[x].prop.scale
	appimages.children[x].scale.y = appimages.children[x].prop.scale
}

function scaledown(x){
	appimages.children[x].prop.scale -= 0.05
	appimages.children[x].scale.x = appimages.children[x].prop.scale
	appimages.children[x].scale.y = appimages.children[x].prop.scale
}

function deleteimage(x){
	appimages.children[x].kill()
	$("#controller-left").hide()
	$("#controller-right").hide()
}

function scaleupT(x){
	apptexts.children[x].prop.scale += 0.05
	apptexts.children[x].scale.x = apptexts.children[x].prop.scale
	apptexts.children[x].scale.y = apptexts.children[x].prop.scale
}

function scaledownT(x){
	apptexts.children[x].prop.scale -= 0.05
	apptexts.children[x].scale.x = apptexts.children[x].prop.scale
	apptexts.children[x].scale.y = apptexts.children[x].prop.scale
}

function deleteT(x){
	apptexts.children[x].kill()
	$("#controller-left").hide()
	$("#controller-right").hide()
}

function toggleUi(){
	$('#ui').toggle()
	$("#controller-left").hide()
	$("#controller-right").hide()
}


function setDlButton(){
	var c = document.getElementsByTagName("canvas")[0]
	var imagelink = document.getElementById("btnsaveimage")
	imagelink.href = c.toDataURL("image/png").replace("image/png", "image/octet-stream")
	imagelink.download = "ImageFromCanvas.png";
}