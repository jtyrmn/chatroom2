//this is to display an error at the top of the screen if the login/signup process had errors
//will only render if message isn't undefined

function ErrorBanner({message}) {
    return (
        <div class="error_banner">
            {message}
        </div>
    )
}

export default ErrorBanner;