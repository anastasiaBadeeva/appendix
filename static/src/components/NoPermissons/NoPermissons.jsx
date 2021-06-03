import React from 'react';

const NoPermissons = () => (
	<div className="no-permission">
    <div>
      <p className="no-permission-text">We’re sorry, but your account does not have permission to access this page.</p>
			<p className="no-permission-text">
        Please email
        <a className="no-permission-link" href="mailto:support@markerr.com"> support@markerr.com</a> to gain access.<br/>
        Thank you.
      </p>
    </div>
	</div>
);

export default NoPermissons;
