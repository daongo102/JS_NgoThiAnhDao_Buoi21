function NhanVien(taiKhoan,ten,email,matKhau,ngayLam,luong,chucVu,gioLam) {
    this.taiKhoanNV = taiKhoan;
    this.tenNV = ten;
    this.emailNV = email;
    this.matKhauNV = matKhau;
    this.ngayLamNV = ngayLam;
    this.luongNV = luong;
    this.chucVuNV = chucVu;
    this.gioLamNV = gioLam;
    this.tongLuong = 0;  
    this.loaiNV = "";  
    this.calcLuong = function () {
        if (this.chucVuNV == "Sếp") {
            this.tongLuong = this.luongNV * 3;
        } else if (this.chucVuNV == "Trưởng phòng") {
            this.tongLuong = this.luongNV * 2;
        }else{
            this.tongLuong = this.luongNV;
        }
    };
    this.xepLoai = function () {
        if (this.gioLamNV >= 192) {
            this.loaiNV = "Xuất sắc";
        } else if (176 <= this.gioLamNV && this.gioLamNV < 192) {
            this.loaiNV = "Giỏi";
        }else if (160 <= this.gioLamNV && this.gioLamNV < 176) {
            this.loaiNV = "Khá";
        }else{
            this.loaiNV = "Trung bình";       
        }
    }    
}