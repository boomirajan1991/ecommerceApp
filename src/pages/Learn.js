import React from "react";
import validator from "validator";

const Learn = () => {
  console.log("isEmail", validator.isEmail("mail2boomirajan@gmail.com"));
  console.log("isPostalCode", validator.isPostalCode("612002", "IN"));
  console.log("isPassportNumber", validator.isPassportNumber("T1078906", "IN"));
  console.log(
    "isURL",
    validator.isURL("https://www.google.co.in/", [
      {
        protocols: ["http", "https", "ftp"],
        require_tld: true,
        require_protocol: false,
        require_host: true,
        require_port: false,
        require_valid_protocol: true,
        allow_underscores: false,
        host_whitelist: false,
        host_blacklist: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false,
        allow_fragments: true,
        allow_query_components: true,
        disallow_auth: false,
        validate_length: true,
      },
    ])
  );
  console.log(
    "isStrongPassword",
    validator.isStrongPassword("Qwerty6&&", [
      {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      },
    ])
  );

  return (
    <div>
      <h1>Learn npm Packages</h1>
    </div>
  );
};

export default Learn;
