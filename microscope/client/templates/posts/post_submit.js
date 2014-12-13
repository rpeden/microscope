Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		Meteor.call('postInsert', post, function(error, result){
			//display error to user and abort
			if(error){
				return alert(error.reason);
			}

			//if duplicate, alert user and route them anyway
			if (result.postExists){
				alert('This link has already been posted');
			}

			Router.go('postPage', {_id: result._id});
		});
	}
});