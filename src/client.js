window.$ = $;
import 'bootstrap';
import 'knockout-datatable/knockout-datatable.js';

class Worklog {
  constructor(ticket, worklog) {
    this.description = ko.observable(worklog.description);
    this.start_time = ko.observable(worklog.start_time ? moment(worklog.start_time) : null);
    this.end_time = ko.observable(worklog.end_time ? moment(worklog.end_time) : null);
    this.time_spent = ko.computed(() => {
      if (this.start_time()) {
        if (this.end_time()) {
          return `${this.end_time().diff(this.start_time(), 'hours', true)}h`;
        }
        return `${moment().diff(this.start_time(), 'hours', true)}h`;
      }
      return "0h";
    });
    this.active = ko.observable(!!worklog.active);
  }
  toggleTimer() {
    console.log('toggling');
  }
}

class Ticket {
  constructor(view, ticket) {
    this.ticket_number = ko.observable(ticket.ticket_number);
    this.ticket_name = ko.observable(ticket.ticket_name);
    this.client_name = ko.observable(ticket.client_name);
    this.worklogs = ko.observableArray(ticket.worklogs.map(worklog => new Worklog(this, worklog)));
  }
  submitTicket() {
    console.log('submitting');
  }
}

class WorkbenchinatorViewModel {
  constructor() {
    this.table = new DataTable([], {
      recordWord: 'ticket',
      sortDir: 'desc',
      sortField: 'client_name',
      perPage: 10,
      unsortedClass: 'fa fa-sort',
      ascSortClass: 'fa fa-sort-asc',
      descSortClass: 'fa fa-sort-desc'
    });
    this.init([{
      ticket_number: 12345,
      ticket_name: "Some Ticket",
      client_name: 'Some Client',
      worklogs: [
        {description: 'A Description', start_time: null, end_time: null, active: false}
      ]
    }]);
    ko.applyBindings(this, $('body')[0]);
  }

  init(tickets) {
    this.table.replaceRows(tickets.map(ticket => new Ticket(this, ticket)));
  }
}


window.WorkbenchinatorViewModel = WorkbenchinatorViewModel;
