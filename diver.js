//
// Класс водолаза
//
function Diver()
{
	this.starsArray;	// массив со всеми звездами на экране
	this.descOfFame;
	this.pauseId;
	this.sea;	// ссылка на родительский элемент
	this.img1;	// diver in ship
	this.img2;	// diver tros
	this.img3;	// diver go harvest
	this.img4;	// diver go home
	this.stars; //	ship load
	this.cloud;	// изображение облака со словами
	this.timerId;
	this.diverY;
	this.diverX;
	this.dir = "down";	// direction
	this.load = 20000;	//счетчик наполнения баллона газом
	this.status = "onship";	// статус будет меняться на: swim
	this.compressor;	// это массив, доступный каждому дайверу для просмотра и изменений: уровень заряда и занят/не занят
	
	var n1 = "notused";	// первая звездочка, которую несет водолаз
	var n2 = "notused";	// вторая звездочка
	var t = true;	// появляются звездочки на корабле, если дайвер выгрузил первую партию
	
	var that = this;

	this.create = function(sea, starsArray, compressor, descOfFame)	// Ф-ция создает все изображения
	{
		that.starsArray = starsArray;
		that.compressor = compressor;
		that.descOfFame = descOfFame;
		that.sea = sea;
		that.diverY = -40;
		that.diverX = 70;
		
		that.img1 = document.createElement('img');
		that.img1.src = "images/diver-in-ship.gif";
		that.img1.className = 'img1';
		sea.appendChild(that.img1);
		
		that.img2 = document.createElement('img');
		that.img2.src = "images/Diver-tros.png";
		that.img2.className = 'img2';
		sea.appendChild(that.img2);
		
		that.img3 = document.createElement('img');
		that.img3.src = "images/Diver-go-harvest.png";
		that.img3.className = 'img3';
		sea.appendChild(that.img3);
		
		that.img4 = document.createElement('img');
		that.img4.src = "images/Diver-go-home.png";
		that.img4.className = 'img4';
		sea.appendChild(that.img4);
		
		that.cloud = document.createElement('img');
		that.cloud.src = "images/thought.png";
		that.cloud.className = 'cloud';
		sea.appendChild(that.cloud);
		
		that.stars = document.createElement('img');
		that.stars.src = "images/ship-load.png";
		that.stars.className = 'stars';
		sea.appendChild(that.stars);
		
		setTimeout(that.diverMove, 2000);
	}
	
	this.diverMove = function()
	{
		if (that.dir == "down" && that.diverY == -40 && that.status == "onship")// меняем изображение и статус,
		{																		// когда дайвер только начинает движение вниз
			that.img1.style.visibility = "hidden";
			that.img2.style.visibility = "visible";
			that.status = "swim";
		}
		that.cloud.style.visibility = "hidden";
		
		that.timerId = setInterval(move, 20);
				
		function move()
		{
			if (that.diverY >= 0)	// дайвер начинает расход кислорода, когда погружается в воду
			{
				that.load -= 2.5;
			}
			
			if (that.load < 0)
			{
				console.log(that.load);
				that.removeDiver();
				that.toDesc();
			}
									
			that.moveDir(that.dir);	// ф-ция осуществляет движение дайвера на 1 px во все стороны
			
			if (that.dir == "down" && that.diverY == 390)	// дайвер спустился с троса и смотрит, есть ли справа звезды
			{
				that.lookRight();
			}
			
			if (that.dir == "right")	// дайвер плывет направо и постоянно проверяет, есть ли звезда в зоне досягаемости
			{
				if (((n1 == "notused") && (n2 == "notused") && (that.status == "swim")) 
									|| ((n1 != "notused") && (n2 == "notused") && (that.status == "swim")))	
				{									// если он уже несет 2 звезды, или он разряжен, то не проверяет наличие звезд на пути		
					that.seeStarR();
				}
				
				if (that.diverX == 382)
				{					
					if (that.load <= 4000)	// проверяем уровень кислорода, если мало,
					{										// то дайвер будет плыть до троса, не замечая звезд
						that.status = "danger";
					}
				}
				
				if (that.diverX == 70) 
				{
					if ((n1 == "notused") && (n2 == "notused"))	// около троса без звезд
					{
						that.lookRight();
					}
					
					if ((n1 != "notused") && (n2 == "notused"))	// около троса с одной звездой
					{
						that.lookRight();
					}
				}
			}
			
			if (that.dir == "left")	// дайвер плывет налево и постоянно проверяет, есть ли звезда в зоне досягаемости
			{
				if (((n1 == "notused") && (n2 == "notused") && (that.status == "swim")) 
									|| ((n1 != "notused") && (n2 == "notused") && (that.status == "swim")))
				{
					that.seeStarL();
				}
				
				if (that.diverX == 382)	// дайвер доплыл с правой стороны до 1/3, отсюда он может просмотреть дно до края
				{							// и развернуться, если звезд там не будет
					that.lookLeft();
				}
				
				if (that.diverX == 70) 
				{
					if ((n1 == "notused") && (n2 == "notused"))	// около троса без звезд
					{
						that.checkLoad();
					}
					
					if ((n1 != "notused") && (n2 == "notused"))	// около троса с одной звездой
					{
						that.lookLeft();
					}
				}
			}
			
			if (that.dir == "up")	// подъем
			{
				that.raiseOnShip();				
			}
			
			if (n1 != "notused")
			{
				that.moveStar1();	// осуществляет движение 1-й звезды						
			}
			
			if (n2 != "notused")
			{
				that.moveStar2();	// осуществляет движение 2-й звезды
			}

			if (that.diverX == -25)	// если дайвер уткнулся в правый край - развернуться
			{
				that.dir = "left";
				that.img4.style.visibility = "hidden";
				that.moveDir(that.dir);
				that.img3.style.visibility = "visible";
			}
						
			if (that.diverX == 650)	// если дайвер уткнулся в левый край - развернуться
			{
				that.dir = "right";
				that.img3.style.visibility = "hidden";
				that.moveDir(that.dir);
				that.img4.style.visibility = "visible";
			}			
		}		
	}
	
	this.moveDir = function(direction)
	{
		switch (direction)
		{
			case "down":
				that.diverY++;
				that.img2.style.top = that.diverY + 'px';
				break;
			case "left":
				that.diverX++;
				that.img3.style.right = that.diverX + 'px';
				break;
			case "right":
				that.diverX--;
				that.img4.style.right = that.diverX + 'px';
				break;
			case "up":
				that.diverY--;
				that.img2.style.top = that.diverY + 'px';
		}
	}
	
	this.lookRight = function()	// взгляд вправо на 1/3 экрана
	{
		if (that.status == "swim")
		{
			for (var i in that.starsArray)
			{
				if ((that.starsArray[i].starX <= that.diverX) && (that.starsArray[i].starX >= (that.diverX - 228)) && (i != n1) 
							&& (that.starsArray[i].starY >= 242) && ((that.starsArray[i].status == "bottom") || (that.starsArray[i].status == "sink")))
					{
						that.dir = "right";
						that.img2.style.visibility = "hidden";
						that.moveDir(that.dir);
						that.img4.style.visibility = "visible";
						return;					
					}
			}
		}
		
		if ((that.diverX == 70) && (that.dir == "right"))	// у троса с 1 звездой
		{
			that.checkLoad(); // проверяем, хватит ли дайверу воздуха подняться вместе со звездой
						
			if (n1 != "notused")
			{
				that.dir = "up";
				that.img4.style.visibility = "hidden";
				that.img2.style.visibility = "visible";
				that.load -= 50;
				that.load -= (that.starsArray[n1].starValue * 0.05);
				that.load -= (that.starsArray[n1].starValue * 50);
				return;
			}			
		} 
		
		if ((that.diverX <= 70) && ((that.dir == "right") || (that.dir == "down")))
		{													// звезд справа нет, и дейвер справа от троса, поворачивает налево
			that.dir = "left";
			that.img4.style.visibility = "hidden";
			that.img2.style.visibility = "hidden";
			that.moveDir(that.dir);
			that.img3.style.visibility = "visible";
		}
	}

	this.seeStarR = function()	// на каждом пикселе высматривает ближайших звезд
	{
		for (var i in that.starsArray) 
		{
			if ((that.starsArray[i].starX <= that.diverX) && (that.starsArray[i].starX >= (that.diverX - 25))
																	&& (that.starsArray[i].status == "bottom"))
				{
					clearInterval(that.timerId);	// если звезда прямо под дайвером останавливаем основной цикл
					that.dir = "down";
					that.starsArray[i].status = "raised";
					var n = i;
					that.raiseR(n);
					return;
				}	
		}
	}
	
	this.raiseR = function(n)	// опускается на дно за звездой при движении вправо
	{
		that.timerId = setInterval(function() {
		
		if (that.starsArray[n].starY == (that.diverY + 20))
		{
			if (n1 == "notused")	// опустился на уровень звезды и проверяет первая это или вторая
			{	
				n1 = n;
				that.starsArray[n1].moveWithDiver((that.diverX - 25), (that.diverY + 20));						
						
			} else if (n2 == "notused")	
			{
				n2 = n;
				that.starsArray[n2].moveWithDiver((that.diverX - 30), (that.diverY + 15));						
			}
			that.dir = "up";
			that.diverY--;
			that.img4.style.top = that.diverY + 'px';
								
		} else if ((that.dir == "up") && (that.diverY == 390))	// вернулись на уровень движения вдоль дна
		{
			clearInterval(that.timerId);	// останавливаем цикл погружения за звездой
																// дайвер определят, где он, и куда напраляться
			if ((n1 != "notused") && (n2 == "notused"))
			{
				that.dir = "right";
				that.lookRight();
				
			} else if ((that.diverX < 70) && (n2 != "notused"))
			{
				that.dir = "left";
				that.img4.style.visibility = "hidden";
				that.moveDir(that.dir);
				that.img3.style.visibility = "visible";
			} else
			{
				that.dir = "right";
			}
			
			that.diverMove();	// запускаем основной цикл движения
			
		} else
		{								// здесь осуществляется движение дайвера вниз за звездой и звезд с ним
			if (that.dir == "down")
			{
				that.diverY++;
				if (n1 != "notused")
				{
					that.starsArray[n1].moveWithDiver((that.diverX - 25), (that.diverY + 20));						
				}
				
			} else if (that.dir == "up")
			{
				that.diverY--;
			
				if (n1 != "notused")
				{
					that.starsArray[n1].moveWithDiver((that.diverX - 25), (that.diverY + 20));						
				}
				
				if (n2 != "notused")
				{
					that.starsArray[n2].moveWithDiver((that.diverX - 30), (that.diverY + 15));
				}
			}
				that.img4.style.top = that.diverY + 'px';
		}	
		}, 50, n);
	}
	
	this.lookLeft = function()	// взгляд на 1/3 экрана влево
	{
		if ((that.diverX >= 382) && (that.load <= 4000))	// если заряд кислорода слишком мал
		{													// дайвер поплывет к тросу, не замечая звезд
			that.status = "danger";
			that.dir = "right";
			that.img3.style.visibility = "hidden";
			that.moveDir(that.dir);
			that.img4.style.visibility = "visible";
			return;
		}
		
		if (that.status == "swim")	// проверка, есть ли слева звезды, соответствующие условиям
		{
			for (var i in that.starsArray) 
			{						
					if ((that.starsArray[i].starX >= that.diverX) && (that.starsArray[i].starX <= (that.diverX + 294)) && (i != n1)
						&& (that.starsArray[i].starY >= 242) && ((that.starsArray[i].status == "bottom") || (that.starsArray[i].status == "sink")))
					{
						return;				
					}
			}
		}
		
		if (that.diverX > 70)	// дайвер слева от троса, левее звезд нет, разворачиваемся
		{
			that.dir = "right";
			that.img3.style.visibility = "hidden";
			that.moveDir(that.dir);
			that.img4.style.visibility = "visible";
		}
	}
	
	this.seeStarL = function()	// постоянный мониторинг дна при движении налево
	{
		for (var i in that.starsArray) 
		{			
			if ((that.starsArray[i].starX == (that.diverX + 40)) && (that.starsArray[i].status == "bottom"))
			{
				clearInterval(that.timerId);	// если дайвер над звездой, останавливаем основной цикл движения
				that.dir = "down";				// дайвер погружается за ней
				that.starsArray[i].status = "raised";	// сразу меняем статус звезды, чтобы другой дайвер
				var n = i;								// ее не замечал
				that.raiseL(n);
				return;
			}			
		}		
	}
	
	this.raiseL = function(n)	// погружение за звездой на дно (все как и направо)
	{
		that.timerId = setInterval(function() {
		
		if (that.starsArray[n].starY == (that.diverY + 20))
		{
			if (n1 == "notused")
			{	
				n1 = n;
				that.starsArray[n1].moveWithDiver((that.diverX + 40), (that.diverY + 20));						
						
			} else if (n2 == "notused")	
			{
				n2 = n;
				that.starsArray[n2].moveWithDiver((that.diverX + 45), (that.diverY + 15));						
			}
			that.dir = "up";
			that.diverY--;
			that.img3.style.top = that.diverY + 'px';
								
		} else if ((that.dir == "up") && (that.diverY == 390))
		{
			clearInterval(that.timerId);
			
			if ((n1 != "notused") && (n2 == "notused"))
			{
				that.dir = "left";
				that.lookLeft();
				
			} else if ((that.diverX > 70) && (n2 != "notused"))
			{
				that.dir = "right";
				that.img3.style.visibility = "hidden";
				that.moveDir(that.dir);
				that.img4.style.visibility = "visible";
			} else
			{
				that.dir = "left";
			}
			
			that.diverMove();
			
		} else
		{
			if (that.dir == "down")
			{
				that.diverY++;
				if (n1 != "notused")
				{
					that.starsArray[n1].moveWithDiver((that.diverX + 40), (that.diverY + 20));						
				}
				
			} else if (that.dir == "up")
			{
				that.diverY--;
			
				if (n1 != "notused")
				{
					that.starsArray[n1].moveWithDiver((that.diverX + 40), (that.diverY + 20));						
				}
				
				if (n2 != "notused")
				{
					that.starsArray[n2].moveWithDiver((that.diverX + 45), (that.diverY + 15));
				}
			}
				that.img3.style.top = that.diverY + 'px';
		}	
		}, 50, n);
	}	
	
	this.raiseOnShip = function()
	{
		if (that.diverY == 278)					// первый отдых 5 сек при подъеме
		{
			clearInterval(that.timerId);
			that.cloud.style.top = (that.diverY - 55) + 'px';
			that.cloud.style.visibility = "visible";
			that.load -= 250;
			setTimeout(that.diverMove, 5000);				
		} 
			
		if (that.diverY == 124)					// второй отдых 10 сек при подъеме
		{
			clearInterval(that.timerId);
			that.cloud.style.top = (that.diverY - 55) + 'px';
			that.cloud.style.visibility = "visible";
			that.load -= 500;
			setTimeout(that.diverMove, 10000);				
		} 
			
		if (that.diverY == 62)					// третий отдых 15 сек при подъеме
		{
			clearInterval(that.timerId);
			that.cloud.style.top = (that.diverY - 55) + 'px';
			that.cloud.style.visibility = "visible";
			that.load -= 750;
			setTimeout(that.diverMove, 15000);				
		} 
			
		if (that.diverY == -40)					// залезает на корабль
		{
			clearInterval(that.timerId);
			that.status = "onship";
			that.img2.style.visibility = "hidden";
			that.img1.style.visibility = "visible";
				
			if (t && (n1 != "notused"))		// появляются звезды на корабле, если дайвер в первый раз их выгрузил
			{
				that.stars.style.visibility = "visible";
				t = false;
			}
								
			if (n1 != "notused")
			{
				that.starsArray[n1].removeStar();	// выгрузка 1-й звезды (перемещение в левую часть экрана)
				n1 = "notused";
			}
				
			if (n2 != "notused")
			{
				that.starsArray[n2].removeStar();	// выгрузка 2-й звезды (перемещение в левую часть экрана)
				n2 = "notused";
			}
				
			that.dir = "down";
				
			if (that.load < 4000)	// проверяем, нужна ли дайверу подзарядка кислородом
			{
				that.loadBallon();
				that.pauseId = setTimeout(that.diverMove, 5000);
			} else
			{						
				that.pauseId = setTimeout(that.diverMove, 2000);	// опять запускаем цикл движения
			}
		}
	
	}
	
	this.moveStar1 = function()	// ф-ция движения первой звезды и вычитание при этом кислорода из баллона
	{
		if (that.diverY <= 0)
		{
			that.load -= (that.starsArray[n1].starValue * 0.05);
		}
		
		if (that.dir == "right")
		{
			that.starsArray[n1].moveWithDiver((that.diverX - 25), (that.diverY + 20));
		} else if (that.dir == "left")
		{
			that.starsArray[n1].moveWithDiver((that.diverX + 40), (that.diverY + 20));
		} else if (that.dir == "up")
		{
			that.starsArray[n1].moveWithDiver((that.diverX - 20), (that.diverY + 10));
		}
	}
	
	this.moveStar2 = function()	// ф-ция движения второй звезды и вычитание при этом кислорода из баллона
	{
		if (that.diverY <= 0)
		{
			that.load -= (that.starsArray[n2].starValue * 0.05);
		}
				
		if (that.dir == "right")
		{
			that.starsArray[n2].moveWithDiver((that.diverX - 30), (that.diverY + 15));
		} else if (that.dir == "left")
		{
			that.starsArray[n2].moveWithDiver((that.diverX + 45), (that.diverY + 15));
		} else if (that.dir == "up")
		{
			that.starsArray[n2].moveWithDiver((that.diverX - 25), (that.diverY + 15));
		}
		
		if (that.diverX == 70 && ((that.dir == "left") || (that.dir == "right")))	// дайвер у троса с 2-мя звездами
		{
			that.checkLoad();	// хватит ли у него кислорода дотащить их обе до корабля
			
			that.dir = "up";
			that.img3.style.visibility = "hidden";
			that.img4.style.visibility = "hidden";
			that.img2.style.visibility = "visible";
			that.load -= 50;
			
			if (n1 != "notused")
			{
				that.load -= (that.starsArray[n1].starValue * 0.05);
				that.load -= (that.starsArray[n1].starValue * 50);
			}
			
			if (n2 != "notused")
			{
				that.load -= (that.starsArray[n2].starValue * 0.05);
				that.load -= (that.starsArray[n2].starValue * 50);
			}
		}
	}
	
	this.checkLoad = function()
	{
		var z = 2525; // столько дайвер тратит кислорода на подъем в одиночку
		var z1;
		var z2;
		
		function riseCosts(n)	// проверяет количество кислорода, затрачиваемого на подъем звезды
		{
			var sum = 0;
			sum += (that.starsArray[n].starValue * 0.05) * 390;
			sum += (that.starsArray[n].starValue * 50);
			return sum;
		}
				
		function throwStar(n)	// осуществляет опускание звезды, если дайвер бросает ее у троса
		{
			that.starsArray[n].status = "sink";
			that.starsArray[n].starX = (that.diverX - 25);
			that.starsArray[n].starY = (that.diverY - 20);
			that.starsArray[n].h = Math.floor(Math.random() * 20) + 1;
			that.starsArray[n].move1();
		}
		
		if ((n1 == "notused") && (n2 == "notused"))	// дайвер проплывает мимо троса без звезд
		{											// проверка, не нужно ли ему подняться и зарядить баллон кислородом
			if (that.load <= 3000)
			{
				that.dir = "up";
				that.img3.style.visibility = "hidden";
				that.img4.style.visibility = "hidden";
				that.moveDir(that.dir);
				that.img2.style.visibility = "visible";
				that.load -= 50;
			}
			return;
		}
		
		if (n1 != "notused")	// проверка, дотащит ли он одну звезду
		{
			z1 = riseCosts(n1);
			z += z1;
			
			if (that.load <= z)
			{
				throwStar(n1);
				n1 = "notused";
				that.dir = "up";
				that.img4.style.visibility = "hidden";
				that.img2.style.visibility = "visible";
				that.load -= 50;
			}
		}
		
		if (n2 != "notused")	// дотащит ли вторую
		{
			z2 = riseCosts(n2);
			z += z2;
			
			if (that.load <= z)
			{
				throwStar(n2);
				n2 = "notused";
			}
		}
	}
	
	this.loadBallon = function()	// зарядка баллона кислородом
	{
		var temp = Math.round(that.load);
		var waitId = setInterval(loadCondition, 10);
		
		function loadCondition()
		{
			if (that.compressor[0] == "free")	// проверка, не заряжается ли сейчас другой дайвер
			{
				clearInterval(waitId);
				that.compressor[0] = "busy";
				if (temp > 0)
				{
					that.compressor[1] -= temp;
				} else
				{
					that.compressor[1] += temp;
					that.compressor[1] -= 20000;					
				}
				that.load = 20000;
			}
		}
	}
	
	this.toDesc = function()
	{
		clearInterval(that.timerId);
		
		if (that.descOfFame[1] >= 300)
		{
			return;
		}
		
		var d = document.getElementById('desc');
		d.style.visibility = "visible";
		d.appendChild(that.img2);
		that.img2.style.visibility = "visible";
		that.diverY = that.descOfFame[1];
		that.img2.style.top = that.diverY + 'px';
		that.diverX = that.descOfFame[0];
		that.img2.style.left = that.diverX + 'px';
		that.descOfFame[0] += 40;
		
		if (that.descOfFame[0] >= 280)
		{
			that.descOfFame[1] += 80;
			that.descOfFame[0] = 2;
		}
	}
	
	this.removeDiver = function()	// удаление дайвера при нажатии на кнопку "удалить дайвера"
	{	
		clearTimeout(that.pauseId);
		that.status = "exit";
		that.sea.removeChild(that.img1);
		that.sea.removeChild(that.img2);
		that.sea.removeChild(that.img3);
		that.sea.removeChild(that.img4);
		that.sea.removeChild(that.cloud);
	}
}