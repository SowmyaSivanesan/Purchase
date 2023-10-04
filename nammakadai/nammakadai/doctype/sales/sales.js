// Copyright (c) 2023, sowmiya and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales', {
	// refresh: function(frm) {

	// }

	qty: function (frm) {
		frm.set_value({
		  amount: frm.doc.rate * frm.doc.qty
		});
	  },
	  before_submit: function (frm) {
		let total_quantity;
		let total_amount;
		frappe.db
		  .get_value("Company", { name: frm.doc.company_name }, "cash_balance")
		  .then(function (value) {
			console.log("Value", value);
			console.log(value.message.cash_balance);
			total_amount = value.message.cash_balance + frm.doc.amount;
			frappe.db.set_value(
			  "Company",frm.doc.company_name,"cash_balance",total_amount);
		  });
		frappe.db
		  .get_value("Item", { name: frm.doc.item_id }, "qty")
		  .then(function (value) {
			console.log(value.message.qty);
			total_quantity = value.message.qty - frm.doc.qty;
			frappe.db.set_value("Item", frm.doc.item_id, "qty", total_quantity);
		  });
	  },
	
});
