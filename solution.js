let Grid = function(data, target){
	this.data = (typeof data == 'string') ? JSON.parse(data) : data;
	this.target = target;

	this.headers = [];

	this.table = null;

	this.isAscending = true;
	this.sortKey = '';

	this.lastSortType = 's';


	this.draw = function(){
		let self = this;
		self.setHeaders();

		self.createTable();
		document.getElementById(self.target).appendChild(self.table);
	}

	this.setHeaders = function () {
		let self = this;

		self.headers = JSON.stringify(self.data)
		.replace(/\W(\w+)":(?=.*\b\1:?)/g, " ")
		.match(/\w*":/g)
		.map(function (item) {
			return item.split('":')[0];
		});
		// self.data.forEach(function(row, header) {
			// 	for(let key in row) {
				// 		console.log(key);
				// 		if(!self.columns[key]) {
					// 			self.headers.push(key);
					// 		}
					// 		self.columns[key] = true ;
					// 	}
					// });

		/*for(let key in self.columns) {
			self.headers[self.columns[key]] = key;
		}*/
		//console.log(Object.keys(self.data[0]));
		console.log(self.headers);
		//console.log(JSON.stringify(self.data).replace(/\W(\w+)":(?=.*\b\1:?)/g, " ").match(/\w*":/g));
		//console.log(JSON.stringify(self.data).replace(/\W(\w+)":(?=.*\b\1:?)/g, " "));
	}

	this.createTable = function(){
		let self = this;
		self.table = document.createElement('table');
		self.table.appendChild(self.createTableHeader());
		self.table.appendChild(self.createTableBody());
		console.log(self.table);
	}

	this.createTableHeader = function() {
		let self = this;
		let tblHeader = document.createElement('thead');
		let tr = document.createElement('tr');

		self.headers.forEach(function(header){
			let td = document.createElement('td');
			td.appendChild(document.createTextNode( header ));
			td.className = "table-heading";
			td.id = header;

			td.addEventListener('click', 
				function(e) {     
					let element = this;
					let colName = element.id;

					self.resetSort();

					if(self.isAscending){
						self.isAscending = false;
						element.innerHTML = colName + '<span>&#709;</span>'
					}else{
						self.isAscending = true;
						element.innerHTML = colName + '<span>&#708;</span>'
					}

					self.sortTable(self.headers.indexOf(element.id));
				}, false);

			tr.appendChild(td);
		})
		//console.log(tr);
		tblHeader.appendChild(tr);
		return tblHeader;
	}

	this.resetSort = function(){
		let self = this;
		let thead = self.table.getElementsByTagName("thead")[0]; // p
		let cols = Array.from(thead.getElementsByTagName("td"));
		cols.forEach(function(col){
			col.innerHTML = col.id;
		});
	}

	this.createTableBody = function(){
		let self = this;
		let tblBody = document.createElement('tbody');
		for (let i = 0; i < self.data.length; i++) {
			tblBody.appendChild(self.createRow(self.data[i]));
		}
		return tblBody;
	}

	this.sortTable = function(sortType){
		let self = this;
		let tbody = self.table.getElementsByTagName("tbody")[0]; // p
		let rows = Array.from(tbody.getElementsByTagName("tr"));

		//console.log(rows);

		rows.sort(function(a, b){
			let cellA = self.getCellValue(sortType, a);
			let cellB = self.getCellValue(sortType, b);

			if(cellA  < cellB){
				return (self.isAscending ? -1 : 1);
			}else if(cellA  > cellB){
				return (self.isAscending ? 1 : -1);
			}else{
				return 0;
			}
		});

		for (var i = 0; i < rows.length; i++) {
			tbody.appendChild(rows[i]);
		}

	}

	this.getCellValue = function(index, element){
		let self = this;
		let cellVal = '';
		const tds = element.getElementsByTagName("td");
		if(tds[index]){
			cellVal = tds[index].innerHTML.trim().toLowerCase();
			if(cellVal == '') {
				switch (self.lastSortType) {
					case 'n':
						cellVal = '0';
						break;
					case 'd':
						cellVal = '1/1/1111';
						break;
					default:
						cellVal = '';
						break;
				}
			}
			if(cellVal != '' && !isNaN(cellVal)){
				cellVal = parseFloat(cellVal);
				self.lastSortType = 'n';
			}else{
				if(cellVal.indexOf('/') > 0 ) {
					let dx = cellVal.split('/');
					let dt = new Date(dx[2], dx[1], dx[0]);
					console.log(dt);
					cellVal = dt.getTime();
					self.lastSortType = 'd';
				}else{
					self.lastSortType = 's';
				}
			}
		}
		return cellVal;
	}


	this.createRow = function(data){
		let self = this;
		let tr = document.createElement('tr');

		self.headers.forEach(function(header){
			let td = document.createElement('td');
			td.className = 'table-rows';
			if( data[header] ){
				td.appendChild(document.createTextNode( data[header] ));
			}else{
				td.appendChild(document.createTextNode(''));
			}
			tr.appendChild(td);
		})
		//console.log(tr);
		return tr;
	}

}

let d3 = [{
      "first_name": "Billy",
      "last_name": "Campbell",
      "phone": "62-(500)527-5325"
      }, {
      "first_name": "Jonathan",
      "last_name": "Black",
      "country": "Russia",
      "phone": "7-(729)811-4597"
      }, {
      "first_name": "cheryl",
      "last_name": "Harvey",
      "country": "Indonesia",
      "phone": "62-(825)454-3810"
      }, {
      "first_name": "Cynthia",
      "last_name": "Cooper"
      }, {
      "first_name": "Thomas",
      "last_name": "Stevens",
      "phone": "86-(527)535-8464"
      }, {
      "first_name": "Jane",
      "last_name": "Chavez",
      "country": "Netherlands"
      }, {
      "first_name": "bobby",
      "last_name": "Price",
      "country": "China",
      "phone": "86-(898)723-6749"
      }, {
      "first_name": "Steve",
      "last_name": "Hansen",
      "phone": "93-(362)494-5552"
      }, {
      "first_name": "Alan",
      "last_name": "Cruz",
      "country": "Philippines",
      "phone": "63-(617)248-8832"
      }, {
      "first_name": "Dennis",
      "last_name": "Baker",
      "country": "Iran",
      "phone": "98-(436)329-3723"
      }, {
      "first_name": "Ernest",
      "last_name": "Bishop",
      "phone": "86-(566)429-1138"
      }, {
      "first_name": "Russell",
      "last_name": "Meyer",
      "phone": "62-(687)827-4302"
      }, {
      "first_name": "Ryan",
      "last_name": "Mendoza",
      "country": "Poland",
      "phone": "48-(537)109-0373"
      }, {
      "first_name": "Maria",
      "last_name": "Greene",
      "phone": "92-(831)367-8049"
      }, {
      "first_name": "Elizabeth",
      "last_name": "Moore",
      "country": "Philippines",
      "phone": "63-(694)844-9255"
      }, {
      "first_name": "Ronald",
      "last_name": "kim",
      "phone": "46-(339)931-9221"
      }, {
      "first_name": "Samuel",
      "last_name": "Jacobs",
      "country": "Russia",
      "phone": "7-(936)156-5229"
      }, {
      "first_name": "Fred",
      "last_name": "Ross",
      "phone": "55-(594)481-7354"
      }, {
      "first_name": "Andrew",
      "last_name": "Burns",
      "country": "Portugal",
      "phone": "351-(174)443-8706"
      }, {
      "first_name": "Robert",
      "last_name": "Frazier",
      "country": "Somalia"
      }];
let d4 = [
      {
      "company_name":"Medline Industries, Inc.",
      "product":"Benzalkonium Chloride",
      "price":"481.63"
      },
      {
      "company_name":"PD-Rx Pharmaceuticals, Inc.",
      "product":"Alprazolam",
      "price":"167.62",
      "fda_date_approved":"02/12/2015"
      },
      {
      "company_name":"West-ward Pharmaceutical Corp.",
      "product":"Flumazenil",
      "fda_date_approved":"23/04/2015"
      },
      {
      "company_name":"HyVee Inc",
      "product":"Aspirin",
      "price":"218.32",
      "fda_date_approved":"26/07/2015"
      },
      {
      "company_name":"Aurobindo Pharma Limited",
      "product":"carisoprodol",
      "price":"375.58",
      "fda_date_approved":"28/11/2014"
      },
      {
      "company_name":"Apotex Corp",
      "product":"Risperidone",
      "price":"213.49",
      "fda_date_approved":"06/11/2015"
      },
      {
      "company_name":"Unit Dose Services",
      "product":"Lovastatin",
      "price":"169.14",
      "fda_date_approved":"14/09/2015"
      },
      {
      "company_name":"Jubilant HollisterStier LLC",
      "product":"Dog Hair Canis spp.",
      "fda_date_approved":"31/12/2014"
      },
      {
      "company_name":"AAA Pharmaceutical, Inc.",
      "product":"ACETAMINOPHEN, CHLORPHENIRAMINE MALEATE, DEXTROMETHORPHAN HYDROBROMIDE, and PHENYLEPHRINE HYDROCHLORIDE",
      "price":"183.33",
      "fda_date_approved":"13/12/2015"
      },
      {
      "company_name":"AKG Innovations LLC",
      "product":"AVOBENZONE, OCTINOXATE, OCTISALATE",
      "fda_date_approved":"22/01/2015"
      },
      {
      "company_name":"hikma Farmaceutica",
      "product":"Oxytocin"
      },
      {
      "company_name":"prime Packaging, Inc.",
      "product":"Avobenzone, Homosalate, Octisalate, Octocrylene, Oxybenzone",
      "price":"208.17"
      },
      {
      "company_name":"Davion, Inc",
      "product":"Triclosan",
      "price":"80.30",
      "fda_date_approved":"13/12/2014"
      },
      {
      "company_name":"CARDINAL HEALTH",
      "product":"CARBOXYMETHYLCELLULOSE SODIUM, GLYCERIN",
      "price":"330.22",
      "fda_date_approved":"11/08/2015"
      },
      {
      "company_name":"Amgen Inc",
      "product":"darbepoetin alfa",
      "price":"332.28",
      "fda_date_approved":"01/07/2015"
      },
      {
      "company_name":"Autumn Harp, Inc.",
      "product":"Salicylic Acid",
      "price":"34.43",
      "fda_date_approved":"25/03/2015"
      },
      {
      "company_name":"American Regent, Inc.",
      "product":"sodium phosphate, monobasic, monohydrate and sodium phosphate, dibasic anhydrous",
      "price":"11.60"
      },
      {
      "company_name":"J. A. Cosmetics U.S. INC",
      "product":"TITANIUM DIOXIDE",
      "price":"130.90",
      "fda_date_approved":"01/12/2015"
      },
      {
      "company_name":"NATURE REPUBLIC CO., LTD.",
      "product":"Titanium Dioxide, OCTINOXATE, Zinc Oxide",
      "price":"124.48"
      },
      {
      "company_name":"L. Perrigo Company",
      "product":"Dextromethorphan Hydrobromide, Guaifenesin",
      "price":"73.09",
      "fda_date_approved":"03/02/2016"
      }
      ];      
let grid = new Grid(d4, 'grid');
let grid1 = new Grid(d3, 'grid');
grid1.draw();
grid.draw();