//гарантированное соблюдение очередности рабатывания функций

var timers =
	{
		timerID: 0,
		timers : [],
				
		add:function(fn)
		{
			this.timers.push(fn);
		},
		start:function()
		{
			if(this.timerID) return;
			(function runNext()
				{
					if (timers.timers.length > 0)
					{
						for (var i = 0; i < timers.timers.length; i++)
						{
							if (timers.timers[i]() === false)
							{
								timers.timers.splice(i, 1);
								i--;
							}
						}
						timers.timerID = setTimeout(runNext,0);
					}
				}
			)();
		},
		stop:function()
		{
			clearTimeout (this.timerID);
			this.timerID = 0;
		}
	};

	timers.add(function()
	{
		alert('1');
		return false;
	});
	timers.add(function()
	{
		alert('2');
		return false;
	});
	timers.add(function()
	{
		alert('3');
		return false;
	});
	timers.add(function()
	{
		alert('4');
		return false;
	});


	timers.start();	