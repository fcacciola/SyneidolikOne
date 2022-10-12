gIdx=0 ;
cSize=3 ;
cTotal=cSize*cSize;

function setInfo(text)
{
  document.getElementById("info").innerHTML = text + "\n";  
}

function addInfo(text)
{
  document.getElementById("info").innerHTML += text + "\n";  
}

function get_cell(g,r,c)
{
  return document.getElementById(g + r + c );
}

function setup_cell(g,r,c,x,y)
{
  cell = get_cell(g,r,c);
  cell.style.position = "absolute";
  cell.style.left = x + "px";
  cell.style.top = y + "px" ;
}

function hide_cell(g,r,c)
{
  cell = get_cell(g,r,c);
  cell.style.display = "none";
}

function show_cell(g,r,c)
{
  cell = get_cell(g,r,c);
  cell.style.display = "block";
}

function set_cell_color(g,r,c,clr)
{
  cell = get_cell(g,r,c);
  cell.style.background = clr ;
}

function is_cell_white(r,c)
{
  cell = get_cell('b',r,c);
  return cell.style.background == 'white';
}

function set_cell_color_by_idx(g,gIdx,clr)
{
  r = Math.floor(gIdx / cSize);
  c = gIdx - ( r * cSize ) ;
  //addInfo("gIdx=" + gIdx + " r=" + r + " c=" + c ) ;
  set_cell_color(g,r,c,clr);
  show_cell(g,r,c);
}

colors = { 'a' : [ "cyan", "cyan" ,"cyan", "cyan" ,"cyan",
                   "cyan", "cyan" ,"cyan", "cyan" ,"cyan",
                   "cyan", "cyan" ,"cyan", "cyan" ,"cyan",
                   "cyan", "cyan" ,"cyan", "cyan" ,"cyan",
                   "cyan", "cyan" ,"cyan", "cyan" ,"cyan", 
                 ] ,
           'b' :  [ "cyan", "cyan" ,"cyan", "cyan" ,"cyan",
                    "cyan", "cyan" ,"cyan", "cyan" ,"cyan",
                    "cyan", "cyan" ,"cyan", "cyan" ,"cyan",
                    "cyan", "cyan" ,"cyan", "cyan" ,"cyan",
                    "cyan", "cyan" ,"cyan", "cyan" ,"cyan", 
                 ] ,
          }

function setup_grid(g)
{
  lx = g == 'a' ? 25 : 200 ;
  ly = 100 ;

  for( r = 0 ; r < cSize ; ++ r ) 
  {
    for ( c = 0 ; c < cSize ; ++ c )
    {
      x = lx + c * 45 ;
      y = ly + r * 45 ; 
      setup_cell(g, r, c, x, y);

    }
  }
}

function setup_grids()
{
  setup_grid('a');
  setup_grid('b');
}

function hide_grid(g)
{
  for( r = 0 ; r < cSize ; ++ r ) 
  {
    for ( c = 0 ; c < cSize ; ++ c )
    {
      hide_cell(g,r,c);
    }
  }
}

function show_grid(g)
{
  for( r = 0 ; r < cSize ; ++ r ) 
  {
    for ( c = 0 ; c < cSize ; ++ c )
    {
      show_cell(g,r,c);
    }
  }
}

function hide_grids()
{
  hide_grid('a');
  hide_grid('b');
}

function show_grids()
{
  show_grid('a');
  show_grid('b');
}

function setup_random_grid()
{
  for( r = 0 ; r < cSize ; ++ r ) 
  {
    for ( c = 0 ; c < cSize ; ++ c )
    {
      rnd = Math.random();
      irnd = Math.floor(rnd * 1000) ;
      even = ( irnd % 2 ) == 0 ;
      color = ( even ? "white" : "black" ) ;
  
      set_cell_color('b', r, c, color);
      colors['b'][(r*cSize)+c] = color ;
    }
  }

  setup_micro_image();
}

function set_micro_image_pixel_color( ctx, x, y, r, g, b ) 
{
  var imgData = ctx.getImageData(x, y, 1, 1);
  imgData.data[0] = r;
  imgData.data[1] = g;
  imgData.data[2] = b;
  imgData.data[3] = 255;
  ctx.putImageData(imgData, x, y);        

  //addInfo("setting pixel x=" + x + " y=" + y + " r=" + r + " g=" + g + " b=" + b) ;
  
}

function set_micro_image_pixel_color_white( ctx, x, y) 
{
  set_micro_image_pixel_color(ctx, x, y, 255, 255, 255);
}

function set_micro_image_pixel_color_black( ctx, x, y) 
{
  set_micro_image_pixel_color(ctx, x, y, 0, 0, 0);
}

function get_random_color_channel()
{
  rnd  = Math.random();
  irnd = Math.floor(rnd * 255) ;
  return irnd ;

}

function set_micro_image_pixel_color_random( ctx, x, y) 
{
  r = get_random_color_channel();  
  g = get_random_color_channel();  
  b = get_random_color_channel();  
  set_micro_image_pixel_color(ctx, x, y, r, g, b);
}

function setup_micro_image()
{
  const canvas = document.getElementById('micro_image');
  const ctx = canvas.getContext('2d');

  for( y = 0 ; y < 9 ; ++ y ) 
  {
    for ( x = 0 ; x < 9 ; ++ x )
    {
      in_cell = false ; 
      if ( x >= 0 && x < 3 )
      {
        if ( y >= 0 && y < 3 )
        {
          if ( is_cell_white(y,x) )
               set_micro_image_pixel_color_white(ctx,x,y) ;
          else set_micro_image_pixel_color_black(ctx,x,y) ;

          in_cell = true ;
        }
      }
      if ( ! in_cell )
        set_micro_image_pixel_color_random(ctx,x,y) ;
    }
  }
}

function setup_hint_image()
{
  const canvas = document.getElementById('aca');
  const ctx = canvas.getContext('2d');  
  
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = './assets/4rai.png';  
  img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0);
    //img.style.display = 'none';
  });

  for( y = 0 ; y < 400 ; ++ y ) 
  {
    for ( x = 0 ; x < 400 ; ++ x )
    {
      rnd = Math.random();
      irnd = Math.floor(rnd * 1000) ;
      even = ( irnd % 2 ) == 0 ;
      if ( even )
           set_micro_image_pixel_color_white(ctx,x,y) ;   
      else set_micro_image_pixel_color_black(ctx,x,y) ;
    }
  }

}

function setup_choice_grid()
{
  for( r = 0 ; r < cSize ; ++ r ) 
  {
    for ( c = 0 ; c < cSize ; ++ c )
    {
      set_cell_color('a', r, c, colors['a'][(r*cSize)+c]);
    }
  }

}

function calculate_score()
{
  score = 0 ; 
  for( i = 0 ; i < cTotal ; ++ i )
    score += ( colors['a'][i] == colors['b'][i] ? +1 : -1 ) ;
  return score ;
}

function show_score(score)
{
  document.getElementById("score").innerHTML = "Score: " + score;  
}

function set_next_cell_color(color)
{
  if ( gIdx < cTotal )
  {
    colors['a'][gIdx] =color ;

    ++ gIdx ;
    if ( gIdx < cTotal )
      set_cell_color_by_idx('a',gIdx,"gray");
  }

  if ( gIdx >= cTotal )
  {
    setup_choice_grid();
    show_grids();
    show_score( calculate_score() );
  }
}

function set_next_cell_as_white()
{
  set_next_cell_color("white");
}

function set_next_cell_as_black()
{
  set_next_cell_color("black");
}

function start_choosing()
{
  gIdx = 0 ;
  setup_random_grid()
  hide_grids();
  set_cell_color_by_idx('a',0,"gray");
}

function init()
{
  setup_grids();
  setup_random_grid()
  hide_grids();

  setup_hint_image();
}

init();