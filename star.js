//
// Класс звездочки.
//
function Star()
{
	this.starsOnShip;
	this.starValue;
	this.starId;
	this.sea;
	this.img;
	this.timerId;
	this.starY;
	this.starX;
	this.h;
	
	//флаг состояния звезды: тонет, на дне, подобрал дайвер, в лодке
	this.status = "sink";
	
	var that = this;
	
	// создание одной оценки
	this.create = function(x, y, sea, starsOnShip)
	{
		that.starsOnShip = starsOnShip;
		that.starX = 672 - x - 46;
		that.starY = y;		
		that.starValue = Math.floor(Math.random() * 10) + 1;	
		that.starId = 'tf-star' + that.starValue;
		that.img = document.createElement('img');
		
		that.img.src = 'images/' + that.starId + '.png';
		that.img.id = that.starId;
		
		that.img.style.top = y + 'px';
		that.img.style.right = that.starX + 'px';
		that.sea = sea;
		that.sea.appendChild(that.img);
		
		that.h = Math.floor(Math.random() * 20) + 1;
		that.move1();
	}	
	
	this.move1 = function()
	{
		that.timerId = setInterval(that.move2, 12);
	}
	
	this.move2 = function()
	{
		that.starY++;
		that.img.style.top = that.starY + 'px';
		
		if (that.starY >= (425 + that.h))
		{
			clearInterval(that.timerId);
			that.status = "bottom";
		}
	}		
		
	this.moveWithDiver = function(x, y)
	{
		that.img.style.right = x + 'px';
		that.img.style.top = y + 'px';
	}
	
	this.removeStar = function()
	{
		var g = document.getElementById('game_field');
		var w = g.offsetLeft;
		
		that.sea.removeChild(that.img);
		var all = document.getElementById('all_stars');
		all.appendChild(that.img);
		that.status = "onShip";
		that.starY = that.starsOnShip[1];
		that.img.style.top = that.starY + 'px';
		that.starX = that.starsOnShip[0];
		that.img.style.left = that.starX + 'px';
		that.starsOnShip[0] += 40;
		
		if (that.starsOnShip[0] >= (w - 40))
		{
			that.starsOnShip[1] += 40;
			that.starsOnShip[0] = 10;
		}
	}
}