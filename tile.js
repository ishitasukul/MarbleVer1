class Tile {
constructor(x,y){
    var tile_options={
        isStatic: true,
        //velocity:{x: 0,y:5}
    }

    this.width= 200;
    this.height= 10;
    this.body = Bodies.rectangle(x, y, this.width, this.height, tile_options);
      
   
      World.add(world, this.body);
    }
    display(){
      var pos =this.body.position;
      //this.body.velocity({x: 0,y:5})
      rectMode(CENTER);
      rect(pos.x, pos.y, this.width,this.height);
      fill("lightpink");
    }
}
