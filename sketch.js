var marble, spacebkg,spike,tile, ground,groundtop,coin;
var coinGroup;
var gameState="PLAY";
var jumpSound, yaySound, scoreSound;

var treasure_ani, treasure;

var score = 0;


function preload(){
    spacebkgImg= loadImage("images/spacebkg.jpg");
    marbleImg= loadImage("images/marble.png");
    spikeImg= loadImage("images/spikes.png");
    tileImg= loadImage("images/tile.png");
    coinImg= loadImage("images/goldcoin.png");


    jumpSound= loadSound("jump.mp3");
    scoreSound= loadSound("score.mp3");
    yaySound= loadSound("yay.mp3");

    treasure_ani= loadAnimation("images/treasure1.png", "images/treasure2.png", "images/treasure3.png",
    "images/treasure4.png", "images/treasure5.png", "images/treasure6.png");

}


function setup(){
    createCanvas(displayWidth, displayHeight-100);
    spacebkg= createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
    spacebkg.addImage(spacebkgImg);
    spacebkg.velocityX= -7;
    spacebkg.scale= 2;

    marble= createSprite(50, displayHeight/2+70, 10, 10);
    marble.addImage(marbleImg);
    marble.scale= 0.2;

    treasure= createSprite(600, 350, 20,20);
    treasure.addAnimation("treasure", treasure_ani);




    
    

    // ground= createSprite(displayWidth/2, displayHeight-200, displayWidth, 10);
    // groundtop= createSprite(displayWidth/2, 50, displayWidth, 10);

    //marble.debug = true;
    marble.setCollider("circle", 0,0,10)

    spikeGroup= new Group();

    tileGroup= new Group();
    coinGroup = new Group()
    invistilegrp=new Group()
    edges = createEdgeSprites()

}



function draw(){
  background(0);

    if (gameState==="PLAY"){
        if (spacebkg.x< displayWidth/2-500){
        spacebkg.x=displayWidth/2;
        }

        if (keyDown("space")&& marble.y>100 && marble.y<displayHeight-200){
        marble.velocityY= -15 ;
        jumpSound.play();
        }
    

        marble.velocityY=marble.velocityY+0.8;
    

        if (keyDown(RIGHT_ARROW)){
        marble.x=marble.x+10
        }
        if (keyDown(LEFT_ARROW)){
        marble.x=marble.x-10
        }   
        
        spawnSpikes();       
        spawnTiles();
        spawnCoins();
        

        treasure.visible=false;
       
        

        if (invistilegrp.isTouching(marble)){
            score= score+10;
            scoreSound.play();
            
        }

        if (marble.isTouching(coinGroup)){
            score= score+5;
            scoreSound.play();
        }

        if (marble.y>displayHeight/2|| marble.y<displayHeight-200){
            marble.x= 200;
        }

        if (score==200){
            background("black");
            treasure.visible=true;
            treasure.changeAnimation("treasure", treasure_ani);
            treasure.scale= 2;
            coinGroup.destroyEach();
            tileGroup.destroyEach();
            spikeGroup.destroyEach();
            invistilegrp.destroyEach();

            spacebkg.velocityX=0;

            marble.x= 620;
            marble.y= 330;

            marble.velocityX=0;
            marble.velocityY=0;

            textSize(50);
            fill("white");
            strokeWeight(8);
            text ("Mission Completed! ", 450, 350);

        }
 
        marble.bounceOff(edges[3]);
        marble.bounceOff(tileGroup)
        // marble.bounceOff(ground);


        if (spikeGroup.isTouching(marble)|| marble.y>displayHeight){
           gameState="END";
        }
        
        
        drawSprites();
        
       
    } 

    else if (gameState=="END"){

        

        tileGroup.setVelocityXEach(0);
        invistilegrp.setVelocityXEach(0);
        spikeGroup.setVelocityXEach(0);
        marble.velocityX = 0;
        tileGroup.destroyEach();
        spikeGroup.destroyEach();
        spacebkg.velocityX = 0;
        background("black");
        textSize(50);
        fill("white");
        strokeWeight(8);
        text ("Mission Failed! ", 450, 350);

       

    }
    
        textSize(20);
        fill("white");
        strokeWeight(8);
        text ("Score : "+score, displayWidth-150, 25);


}


function spawnSpikes(){
    if (frameCount%180===0){
        spike= createSprite(displayWidth,random(200,500), 20,20);
        spike.addImage(spikeImg);
        spike.velocityX=-4;
        spike.scale=0.6;
        
        spikeGroup.add(spike);
        
        
    }
}

function spawnTiles(){
    if (frameCount%60===0){
        tile= createSprite(displayWidth, random(50,displayHeight-200), 150,5);
        tile.addImage(tileImg);
        tile.scale=0.5;
        tile.velocityX=-6;
        //tile.debug = true
        
        tileGroup.add(tile);
        marble.depth= tile.depth;
        marble.depth=marble.depth+1;
        //spikeGroup.maxDepth(tileGroup.maxDepth()+1)
        tileGroup.maxDepth(marble.depth-1)

        invistile= createSprite(displayWidth, tile.y+30, 150,5);
        invistile.velocityX =tile.velocityX;
        invistile.x= tile.x;
        invistile.setCollider("rectangle",0,0,invistile.width,invistile.height)
        invistile.visible=false;
        invistilegrp.add(invistile)

        if(mousePressedOver(tile)){
            marble.x= mouse.X;
            marble.y = mouseY;
        }
    }
}

function spawnCoins(){
    if (frameCount%200===0){
            coin= createSprite(displayWidth,random(200,500), 20,20);
            coin.addImage(coinImg);
            coin.velocityX=-4;
            coin.scale=0.1;
            
            coinGroup.add(coin);  
            
    }
}
