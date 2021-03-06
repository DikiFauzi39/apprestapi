'use strict';

module.exports = function (app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);
    
    app.route('/tampil')
    .get(jsonku.tampilsemuamahasiswa);

    app.route('/tampil/:id')
    .get(jsonku.tampilbyid);

    app.route('/tambah')
    .post(jsonku.tambahdata);

    app.route('/ubah')
    .put(jsonku.editdata);

    app.route('/hapus')
    .delete(jsonku.hapusdata);

    app.route('/tampilg')
    .get(jsonku.showgroup);
}   