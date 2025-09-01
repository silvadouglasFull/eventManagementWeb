const NotFoundPage: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1>404</h1>
                <h3>Page Not Found</h3>
                <p>The page you are looking for does not exist.</p>
                <a href="/">Go to Home</a>
            </div>
        </div>
    );
};
export default NotFoundPage