
const Home = (props) =>{
    return (
    <div className="container mt-4">
        <h2 className="mb-4">🏠  Tổng Quan Dự Án</h2>

        <div className="card mb-3">
            <div className="card-header bg-primary text-white">🔧 Quản lý người dùng (Users)</div>
            <div className="card-body">
                <ul>
                    <li>Thêm/Sửa/Xóa người dùng (CRUD)</li>
                    <li>Mã hóa mật khẩu với Bcrypt</li>
                    <li>Hiển thị danh sách người dùng (có phân trang)</li>
                    <li>Modal form (Bootstrap 5)</li>
                </ul>
            </div>
        </div>

        <div className="card mb-3">
            <div className="card-header bg-success text-white">👥 Quản lý nhóm & phân quyền (Groups & Roles)</div>
            <div className="card-body">
                <ul>
                    <li>Tạo nhóm người dùng</li>
                    <li>Tạo quyền (Role) – Thêm/Xóa</li>
                    <li>Gán quyền cho nhóm</li>
                    <li>Hiển thị danh sách nhóm và quyền</li>
                </ul>
            </div>
        </div>

        <div className="card mb-3">
            <div className="card-header bg-warning text-dark">🔐 Xác thực & Phân quyền (Auth)</div>
            <div className="card-body">
                <ul>
                    <li>Đăng ký / Đăng nhập (React + Node.js)</li>
                    <li>JWT Authentication (Cookies / Bearer)</li>
                    <li>Phân quyền theo route (Private Route React)</li>
                    <li>Middleware kiểm tra quyền</li>
                </ul>
            </div>
        </div>

        <div className="card mb-3">
            <div className="card-header bg-info text-white">🎨 Giao diện & Responsive</div>
            <div className="card-body">
                <ul>
                    <li>Giao diện sử dụng Bootstrap 5</li>
                    <li>Form Login / Register Responsive</li>
                    <li>Navbar, Layout chia rõ ràng</li>
                </ul>
            </div>
        </div>

        <div className="card mb-3">
            <div className="card-header bg-secondary text-white">🔄 API & Kết nối React - Node.js</div>
            <div className="card-body">
                <ul>
                    <li>RESTful APIs chuẩn cho User, Auth, Roles</li>
                    <li>Axios: gọi API, interceptor, base URL</li>
                    <li>Fix CORS</li>
                </ul>
            </div>
        </div>

        <div className="card mb-3">
            <div className="card-header bg-dark text-white">⚙️ Kỹ thuật nâng cao</div>
            <div className="card-body">
                <ul>
                    <li>React Context lưu trạng thái đăng nhập</li>
                    <li>Loading Page, Session timeout</li>
                    <li>Tùy chỉnh cấu trúc Axios</li>
                </ul>
            </div>
        </div>
    </div>
);

}

export default Home;