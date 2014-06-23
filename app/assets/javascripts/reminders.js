$(document).ready(function(){
  Pusher.host = 'localhost'
  Pusher.httpHost = 'localhost'
  Pusher.ws_port = '8080'
  Pusher.wss_port = '8080'
  window.pusher = new Pusher(PUSHER_API_KEY, {authEndpoint: '/pusher/authentication', authTransport: 'ajax',
        activityTimeout: 120000, disableStats: true});

  var reminder = pusher.subscribe('reminder');
  var event_name = 'reminder_12345';
  reminder.bind(event_name, function(data){
    $.notify.defaults({autoHide: false, clickToHide: true});
    $.notify.addStyle('notification', {
        html: "<h4><span data-notify-text/></h4>",
        classes: {
            base: {
              "background-color": "#fcf8e3",
              "border-color": "#faebcc",
              "color": "#8a6d3b",
              "padding": "15px",
              "border-radius": "2px"
            }
        }
    });
    $.notify(data['notification_text'], {style: 'notification', className: 'base'});
  });
});
