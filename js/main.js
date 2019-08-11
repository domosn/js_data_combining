$(document).ready(function(){
	var urlData1 = "data/data1.json";
	var urlData2 = "data/data2.json";
	var urlData3 = "data/data3.json";

	//ajax載入。使用 ajax 取得 data/data1.json, data2.json, data3.json
	$.getJSON(urlData1, {}, function(j1){
		$.getJSON(urlData2, {}, function(j2){
			$.getJSON(urlData3, {}, function(j3){
				//取出data3.json中屬性值並存入d3Array陣列
				var d3Array = [];
				for(i in j3){
					d3Array.push(j3[i]);
				}

				j1.forEach(function(p1){
					//j1(data1) 的 key 為主，j2(data2)使用filter()進行比對，並在j1(data1)中建立屬性cell8、屬性值為j2(data2).cell8
					//2.以 data2.json 的 key 對應至 data1 的 key 以完成 cell8 欄位
					var r1 = j2.filter(function(p2){
						return p2.key === p1.key;
					});
					p1.cell8 = (r1[0] !== undefined) ? r1[0].cell8 : null;
					
					//j1(data1) 的 cell4  為主，d3Array(新data3)使用filter()進行比對，並在j1(data1)中建立屬性cell9、屬性值為d3Array(新data3).cell9
					//3.以 data3.json 的 cell4 對應至 data1 的 cell4 以完成 cell9 欄位
					var r2 = d3Array.filter(function(p3){
						return p3.cell4 === p1.cell4;
					});
					p1.cell9 = (r2[0] !== undefined) ? r2[0].cell9 : null;
				});

				//處理 j1(data1) 最終結果及產生所需html元素標籤，同時存入items陣列
				var items = [];
				$.each(j1, function(key, val){
					items.push("<tr>");
					items.push("<td><span class='star'></span>" +  val.key + "</td>");
					items.push("<td>" + val.cell1 + "</td>");
					items.push("<td>" + val.cell2 + "</td>");
					items.push("<td>" + val.cell3 + "</td>");
					items.push("<td>" + val.cell4 + "</td>");
					items.push("<td>" + val.cell5 + "</td>");
					items.push("<td>" + val.cell6 + "</td>");
					items.push("<td>" + val.cell7 + "</td>");
					items.push("<td>" + val.cell8 + "</td>");
					items.push("<td>" + val.cell9 + "</td>");
					items.push("</tr>");
				});
				
				//1.將items轉為字串，載入dom中的<table>標籤中。以 data1 的資料為主體產生表格
				$("<tbody>", {html:items.join("")}).appendTo("table");
				
				//4.點選列 - 背景變色。點擊 tr 可產生整列背景變色效果 (上一次點選列應恢復預設)
				$("td").on("click", function(){
					var $this = $(this);
					$("tr").removeClass("selected");
					$this.parent().addClass("selected");
				});
				
				//5.星星 - 點擊事件。點擊星星可產生圖片變化效果 (但列背景不應變色)
				$("span.star").on("click", function(){
					$(this).toggleClass("selected");
					return false;
				});
				
				//dom載入耗時
				var timingStart = performance.timing.domLoading;
				var timingEnd = performance.timing.domComplete;
				var domLoadTime = timingEnd - timingStart;
				$("span.usuage").text(domLoadTime);
			});
		});
	});

});