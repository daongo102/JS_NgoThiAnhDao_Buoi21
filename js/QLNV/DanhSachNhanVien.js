function DanhSachNhanVien() {
    this.mangNV = [];

    this.themNV = function (nv) {
        this.mangNV.push(nv);
    };

    this.timIndex = function (taiKhoan) {
        var indexFind = -1;
        this.mangNV.map(function (nv, index) {
            if (nv.taiKhoanNV === taiKhoan) {
                indexFind = index;
            }
        })
        console.log(indexFind)
        return indexFind;
    };

    this.xoaNV = function (taiKhoan) {
        var index = this.timIndex(taiKhoan);
        // console.log(index)
        if (index > -1) {
            this.mangNV.splice(index, 1);
        }
    };

    this.capNhat = function (nv) {
        var indexFind = this.timIndex(nv.taiKhoanNV);
        if (indexFind > -1) {
            dsnv.mangNV[indexFind] = nv;
            return true;
        }
    }    
}

DanhSachNhanVien.prototype.timKiemTheoLoaiNV = function (tuTim) {
    var mangTK = [];
    var tuTimThuong = tuTim.toLowerCase();
    var tuTimReplace = tuTimThuong.replace(/\s/g, "");
    this.mangNV.map(function (nv, index) {
        var tenThuong = nv.loaiNV.toLowerCase();
        var tenReplace = tenThuong.replace(/\s/g, "");

        var result = tenReplace.indexOf(tuTimReplace);
        if (result > -1) {
            mangTK.push(nv);
        }
    });
    return mangTK;
}