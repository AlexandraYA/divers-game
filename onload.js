/*
 * Точка входа.
 * It is enter point.
**/
window.onload = function()
{
	var start = new Date();
	
	var starsNumber = 0;
	var starsArray = [];
	var diversNumber = 0;
	var diversArray = [];
	var compressor = [];
	var starsOnShip = [];
	var descOfFame = [];
	descOfFame[0] = 2;
	descOfFame[1] = 35;
	starsOnShip[0] = 10;
	starsOnShip[1] = 10;
	compressor[0] = "free";
	compressor[1] = 0;
	
	var sea = document.getElementById('sea');
	var add = document.getElementById('add');
	var del = document.getElementById('delete');
	var com = document.getElementById('compressor');
	var loadId;
	var scale = document.getElementById("scale");
	var n = 20;
	scale.innerHTML = '';
	
	for (var i = 0; i < n; i++)
	{			
		var div = document.createElement('div');
		scale.appendChild(div);
	}
	
	addDiver();	// создаем первого дайвера
	
	var comprId = setInterval(loadCompressor, 1000);	//запускаем генерацию кислорода компрессором через каждую сек на 3л
	
	sea.onmousedown = function(e)	// появление звезд при нажатии на клавишу мыши
	{
		e = e || window.event;
		
		if (e.pageX == null && e.clientX != null )	// для IE
		{
			var html = document.documentElement
			var body = document.body
			 
			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
			e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
		}
		
		x = e.pageX - this.offsetLeft - 23;
		y = e.pageY - this.offsetTop - 21;
		
		var star = new Star;
		star.create(x, y, this, starsOnShip);
		starsArray[starsNumber] = star;
		starsNumber++;
	}
	
	add.onmousedown = function(e)	// добавление дайвера
	{
		e = e || window.event;
				
		addDiver();
	}
	
	del.onmousedown = function(e)	// удаление дайвера
	{
		e = e || window.event;
		
		for (var i in diversArray)
		{
			if (diversArray[i].status == "onship")
			{
				diversArray[i].removeDiver();
				try
				{
					delete diversArray[i].diverMove;
				} catch(e)
				{
					diversArray[i].removeAttribute("diverMove");	// для IE

				}
				return;
			}
		}
	}
	
	function loadCompressor()	// работа компрессора и управление шкалы заряда дайвера
	{
		compressor[1] += 3000;
		com.innerHTML = "Компрессор <br/><hr/>" + compressor[0] + "&nbsp&nbsp&nbsp" + compressor[1] + "мл";
		
		if (compressor[0] == "busy")
		{		
			clearInterval(comprId);
			scale.style.visibility = "visible";
			for (var i = 0; i < n; i++)
			{			
				scale.children[i].style.backgroundColor = "#ffffff";
			}
			loadId = setInterval(load, 300);
			comprId = setInterval(loadCompressor, 1000);
		}
		
		function load()
		{
			n--;
			scale.children[n].style.backgroundColor = "#03c03c";
			
			if (n <= 0)
			{
				clearInterval(loadId);
				n = 20;
				scale.style.visibility = "hidden";
				compressor[0] = "free";
				return;
			}
		}
	}
	
	function addDiver()
	{
		var diver = new Diver;
		diver.create(sea, starsArray, compressor, descOfFame);
		diversArray[diversNumber] = diver;
		diversNumber++;
	}
	
	var b = 9;
	for (var i = 0; i < 10000; i++) { 
	b = b*i;
	}
	var end = new Date(); 
	console.log('Скорость ' + (end.getTime()-start.getTime()) + ' мс');
}		