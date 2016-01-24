//
// ����� ��������
//
function Diver()
{
	this.starsArray;	// ������ �� ����� �������� �� ������
	this.descOfFame;
	this.pauseId;
	this.sea;	// ������ �� ������������ �������
	this.img1;	// diver in ship
	this.img2;	// diver tros
	this.img3;	// diver go harvest
	this.img4;	// diver go home
	this.stars; //	ship load
	this.cloud;	// ����������� ������ �� �������
	this.timerId;
	this.diverY;
	this.diverX;
	this.dir = "down";	// direction
	this.load = 20000;	//������� ���������� ������� �����
	this.status = "onship";	// ������ ����� �������� ��: swim
	this.compressor;	// ��� ������, ��������� ������� ������� ��� ��������� � ���������: ������� ������ � �����/�� �����
	
	var n1 = "notused";	// ������ ���������, ������� ����� �������
	var n2 = "notused";	// ������ ���������
	var t = true;	// ���������� ��������� �� �������, ���� ������ �������� ������ ������
	
	var that = this;

	this.create = function(sea, starsArray, compressor, descOfFame)	// �-��� ������� ��� �����������
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
		if (that.dir == "down" && that.diverY == -40 && that.status == "onship")// ������ ����������� � ������,
		{																		// ����� ������ ������ �������� �������� ����
			that.img1.style.visibility = "hidden";
			that.img2.style.visibility = "visible";
			that.status = "swim";
		}
		that.cloud.style.visibility = "hidden";
		
		that.timerId = setInterval(move, 20);
				
		function move()
		{
			if (that.diverY >= 0)	// ������ �������� ������ ���������, ����� ����������� � ����
			{
				that.load -= 2.5;
			}
			
			if (that.load < 0)
			{
				console.log(that.load);
				that.removeDiver();
				that.toDesc();
			}
									
			that.moveDir(that.dir);	// �-��� ������������ �������� ������� �� 1 px �� ��� �������
			
			if (that.dir == "down" && that.diverY == 390)	// ������ ��������� � ����� � �������, ���� �� ������ ������
			{
				that.lookRight();
			}
			
			if (that.dir == "right")	// ������ ������ ������� � ��������� ���������, ���� �� ������ � ���� ������������
			{
				if (((n1 == "notused") && (n2 == "notused") && (that.status == "swim")) 
									|| ((n1 != "notused") && (n2 == "notused") && (that.status == "swim")))	
				{									// ���� �� ��� ����� 2 ������, ��� �� ��������, �� �� ��������� ������� ����� �� ����		
					that.seeStarR();
				}
				
				if (that.diverX == 382)
				{					
					if (that.load <= 4000)	// ��������� ������� ���������, ���� ����,
					{										// �� ������ ����� ����� �� �����, �� ������� �����
						that.status = "danger";
					}
				}
				
				if (that.diverX == 70) 
				{
					if ((n1 == "notused") && (n2 == "notused"))	// ����� ����� ��� �����
					{
						that.lookRight();
					}
					
					if ((n1 != "notused") && (n2 == "notused"))	// ����� ����� � ����� �������
					{
						that.lookRight();
					}
				}
			}
			
			if (that.dir == "left")	// ������ ������ ������ � ��������� ���������, ���� �� ������ � ���� ������������
			{
				if (((n1 == "notused") && (n2 == "notused") && (that.status == "swim")) 
									|| ((n1 != "notused") && (n2 == "notused") && (that.status == "swim")))
				{
					that.seeStarL();
				}
				
				if (that.diverX == 382)	// ������ ������ � ������ ������� �� 1/3, ������ �� ����� ����������� ��� �� ����
				{							// � ������������, ���� ����� ��� �� �����
					that.lookLeft();
				}
				
				if (that.diverX == 70) 
				{
					if ((n1 == "notused") && (n2 == "notused"))	// ����� ����� ��� �����
					{
						that.checkLoad();
					}
					
					if ((n1 != "notused") && (n2 == "notused"))	// ����� ����� � ����� �������
					{
						that.lookLeft();
					}
				}
			}
			
			if (that.dir == "up")	// ������
			{
				that.raiseOnShip();				
			}
			
			if (n1 != "notused")
			{
				that.moveStar1();	// ������������ �������� 1-� ������						
			}
			
			if (n2 != "notused")
			{
				that.moveStar2();	// ������������ �������� 2-� ������
			}

			if (that.diverX == -25)	// ���� ������ �������� � ������ ���� - ������������
			{
				that.dir = "left";
				that.img4.style.visibility = "hidden";
				that.moveDir(that.dir);
				that.img3.style.visibility = "visible";
			}
						
			if (that.diverX == 650)	// ���� ������ �������� � ����� ���� - ������������
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
	
	this.lookRight = function()	// ������ ������ �� 1/3 ������
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
		
		if ((that.diverX == 70) && (that.dir == "right"))	// � ����� � 1 �������
		{
			that.checkLoad(); // ���������, ������ �� ������� ������� ��������� ������ �� �������
						
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
		{													// ����� ������ ���, � ������ ������ �� �����, ������������ ������
			that.dir = "left";
			that.img4.style.visibility = "hidden";
			that.img2.style.visibility = "hidden";
			that.moveDir(that.dir);
			that.img3.style.visibility = "visible";
		}
	}

	this.seeStarR = function()	// �� ������ ������� ������������ ��������� �����
	{
		for (var i in that.starsArray) 
		{
			if ((that.starsArray[i].starX <= that.diverX) && (that.starsArray[i].starX >= (that.diverX - 25))
																	&& (that.starsArray[i].status == "bottom"))
				{
					clearInterval(that.timerId);	// ���� ������ ����� ��� �������� ������������� �������� ����
					that.dir = "down";
					that.starsArray[i].status = "raised";
					var n = i;
					that.raiseR(n);
					return;
				}	
		}
	}
	
	this.raiseR = function(n)	// ���������� �� ��� �� ������� ��� �������� ������
	{
		that.timerId = setInterval(function() {
		
		if (that.starsArray[n].starY == (that.diverY + 20))
		{
			if (n1 == "notused")	// ��������� �� ������� ������ � ��������� ������ ��� ��� ������
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
								
		} else if ((that.dir == "up") && (that.diverY == 390))	// ��������� �� ������� �������� ����� ���
		{
			clearInterval(that.timerId);	// ������������� ���� ���������� �� �������
																// ������ ���������, ��� ��, � ���� �����������
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
			
			that.diverMove();	// ��������� �������� ���� ��������
			
		} else
		{								// ����� �������������� �������� ������� ���� �� ������� � ����� � ���
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
	
	this.lookLeft = function()	// ������ �� 1/3 ������ �����
	{
		if ((that.diverX >= 382) && (that.load <= 4000))	// ���� ����� ��������� ������� ���
		{													// ������ �������� � �����, �� ������� �����
			that.status = "danger";
			that.dir = "right";
			that.img3.style.visibility = "hidden";
			that.moveDir(that.dir);
			that.img4.style.visibility = "visible";
			return;
		}
		
		if (that.status == "swim")	// ��������, ���� �� ����� ������, ��������������� ��������
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
		
		if (that.diverX > 70)	// ������ ����� �� �����, ����� ����� ���, ���������������
		{
			that.dir = "right";
			that.img3.style.visibility = "hidden";
			that.moveDir(that.dir);
			that.img4.style.visibility = "visible";
		}
	}
	
	this.seeStarL = function()	// ���������� ���������� ��� ��� �������� ������
	{
		for (var i in that.starsArray) 
		{			
			if ((that.starsArray[i].starX == (that.diverX + 40)) && (that.starsArray[i].status == "bottom"))
			{
				clearInterval(that.timerId);	// ���� ������ ��� �������, ������������� �������� ���� ��������
				that.dir = "down";				// ������ ����������� �� ���
				that.starsArray[i].status = "raised";	// ����� ������ ������ ������, ����� ������ ������
				var n = i;								// �� �� �������
				that.raiseL(n);
				return;
			}			
		}		
	}
	
	this.raiseL = function(n)	// ���������� �� ������� �� ��� (��� ��� � �������)
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
		if (that.diverY == 278)					// ������ ����� 5 ��� ��� �������
		{
			clearInterval(that.timerId);
			that.cloud.style.top = (that.diverY - 55) + 'px';
			that.cloud.style.visibility = "visible";
			that.load -= 250;
			setTimeout(that.diverMove, 5000);				
		} 
			
		if (that.diverY == 124)					// ������ ����� 10 ��� ��� �������
		{
			clearInterval(that.timerId);
			that.cloud.style.top = (that.diverY - 55) + 'px';
			that.cloud.style.visibility = "visible";
			that.load -= 500;
			setTimeout(that.diverMove, 10000);				
		} 
			
		if (that.diverY == 62)					// ������ ����� 15 ��� ��� �������
		{
			clearInterval(that.timerId);
			that.cloud.style.top = (that.diverY - 55) + 'px';
			that.cloud.style.visibility = "visible";
			that.load -= 750;
			setTimeout(that.diverMove, 15000);				
		} 
			
		if (that.diverY == -40)					// �������� �� �������
		{
			clearInterval(that.timerId);
			that.status = "onship";
			that.img2.style.visibility = "hidden";
			that.img1.style.visibility = "visible";
				
			if (t && (n1 != "notused"))		// ���������� ������ �� �������, ���� ������ � ������ ��� �� ��������
			{
				that.stars.style.visibility = "visible";
				t = false;
			}
								
			if (n1 != "notused")
			{
				that.starsArray[n1].removeStar();	// �������� 1-� ������ (����������� � ����� ����� ������)
				n1 = "notused";
			}
				
			if (n2 != "notused")
			{
				that.starsArray[n2].removeStar();	// �������� 2-� ������ (����������� � ����� ����� ������)
				n2 = "notused";
			}
				
			that.dir = "down";
				
			if (that.load < 4000)	// ���������, ����� �� ������� ���������� ����������
			{
				that.loadBallon();
				that.pauseId = setTimeout(that.diverMove, 5000);
			} else
			{						
				that.pauseId = setTimeout(that.diverMove, 2000);	// ����� ��������� ���� ��������
			}
		}
	
	}
	
	this.moveStar1 = function()	// �-��� �������� ������ ������ � ��������� ��� ���� ��������� �� �������
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
	
	this.moveStar2 = function()	// �-��� �������� ������ ������ � ��������� ��� ���� ��������� �� �������
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
		
		if (that.diverX == 70 && ((that.dir == "left") || (that.dir == "right")))	// ������ � ����� � 2-�� ��������
		{
			that.checkLoad();	// ������ �� � ���� ��������� �������� �� ��� �� �������
			
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
		var z = 2525; // ������� ������ ������ ��������� �� ������ � ��������
		var z1;
		var z2;
		
		function riseCosts(n)	// ��������� ���������� ���������, �������������� �� ������ ������
		{
			var sum = 0;
			sum += (that.starsArray[n].starValue * 0.05) * 390;
			sum += (that.starsArray[n].starValue * 50);
			return sum;
		}
				
		function throwStar(n)	// ������������ ��������� ������, ���� ������ ������� �� � �����
		{
			that.starsArray[n].status = "sink";
			that.starsArray[n].starX = (that.diverX - 25);
			that.starsArray[n].starY = (that.diverY - 20);
			that.starsArray[n].h = Math.floor(Math.random() * 20) + 1;
			that.starsArray[n].move1();
		}
		
		if ((n1 == "notused") && (n2 == "notused"))	// ������ ���������� ���� ����� ��� �����
		{											// ��������, �� ����� �� ��� ��������� � �������� ������ ����������
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
		
		if (n1 != "notused")	// ��������, ������� �� �� ���� ������
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
		
		if (n2 != "notused")	// ������� �� ������
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
	
	this.loadBallon = function()	// ������� ������� ����������
	{
		var temp = Math.round(that.load);
		var waitId = setInterval(loadCondition, 10);
		
		function loadCondition()
		{
			if (that.compressor[0] == "free")	// ��������, �� ���������� �� ������ ������ ������
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
	
	this.removeDiver = function()	// �������� ������� ��� ������� �� ������ "������� �������"
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