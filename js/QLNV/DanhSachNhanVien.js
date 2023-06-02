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

DanhSachNhanVien.prototype.timKiemTheoLoaiNV= function(){
    var mangTK = [];
    var loai = "";
    this.mangNV.map(function(nv,index){
        
    })

}