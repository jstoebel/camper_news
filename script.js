

var getAge = function(postTime) {
	//pre: post time (in unix time)
	//post: number of days since post as string

	var now = new Date();
	var timeDelta = now - postTime; 
	var days = Math.floor(timeDelta / 86400000) //number of miliseconds in a day
	var age = days.toString();

	if (days == 1){
		age += " day";
	} else {
		age += " days";
	}

	age += " ago";
	return age;

}

var getDate = function(postTime) {
	//pre: post time (in unix time)
	//post: date of post (mm/dd/yyyy)

	var postDate = new Date(postTime)
	var month = postDate.getMonth() + 1;
	var date = postDate.getDate();
	var year = postDate.getFullYear();

	return `${month}/${date}/${year}`

}

var buildPage = function(json) {
	//pre: json: response from campernews api
	//post: camper news page is built

	for (i in json) {
		//assembles a post based on:
			//url: the url of the link
			//imgSrc: the source image to use (either poster or link preview)
			//articleTitle: the title of the article, 
			//poster the person posting, 
			//postDate date of post (mm/dd/yyyy)
			//favCount: the number of favorites for the post

		var record = json[i];
		var url = record.link;
		var imgSrc = record.author.picture;

		//slice article title to 50 characters if needed
		if (record.headline.length > 50){
			var articleTitle = record.headline.slice(0, 50) + "..."
		} else {
			var articleTitle = record.headline;
		}

		var poster = record.author.username;
		// var age = getAge(record.timePosted);
		var postDate = getDate(record.timePosted);
		var favCount = record.rank;


		var post = `<div class="col-xs-12 col-sm-6 col-md-3">
						<a href='${url}'>
							<img class='profile-pic'src='${imgSrc}'>
						</a>
						</br>

						<div class="row">
							<div class="col-xs-12">
								<div class='title'>${articleTitle}</div>
								<div class='poster'>
									<span class='glyphicon glyphicon-pencil'></span> <a href='http://freecodecamp/${poster}'>${poster}</a>
								
								</div>
								<div class='row meta-data'>
									<div class='col-xs-6'>
										<span class='glyphicon glyphicon-calendar'></span><span class='postDate'>${postDate}</span>
									</div>
									<div class='col-xs-6'>
										<div class='fav'>
											<span class='glyphicon glyphicon-heart'></span>
											<span class='fav-count'>${favCount}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>`

		$("#news").append(post)
	}

}


$(document).ready(function() {

	$.getJSON("http://www.freecodecamp.com/news/hot", function(json){
		buildPage(json);
	})

})