
function Footer() {
    return (
        <footer className="page-footer font-small blue pt-4">
            <div className="row">
                <h5 className="text-uppercase">Hope you enjoyed</h5>
                <div>The code is on github in the link bellow</div>
                <a href="https://github.com/yuvalBarkai/vacations" target="_blank" rel="noreferrer">github.com/yuvalBarkai/vacations</a>
                {/* <hr className="clearfix w-100 d-md-none pb-0" /> */}
            </div>
            <div className="footer-copyright text-center py-3">
                © Rights reserved to Yuval Barkai   
            </div>
        </footer>
    )
}

export default Footer;