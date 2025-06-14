import jwt from "jsonwebtoken";

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        //In HTTP headers, all header names are automatically converted to lowercase by Node.js and most server frameworks, including Express.
        const { dtoken } = req.headers;
        console.log("dtoken:", dtoken);
        if (!dtoken) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again",
            });
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
        /* 
        Decodes and verifies the JWT (JSON Web Token).

It checks if the dtoken is valid and untampered using your secret key (JWT_SECRET).

If it's valid, it returns the payload (the data inside the token).
in your case:
token_decode = {
  id: "6829e436f37a563eacdbf881", // doctor's ID
  iat: 1749370945                // "issued at" timestamp
}

iat = Issued At
value is a Unix timestamp — it counts seconds from January 1, 1970 (the Unix epoch).

How I decoded 1749370945 into a date/time:
const iat = 1749370945;
const date = new Date(iat * 1000); // multiply by 1000 because JS Date expects milliseconds
console.log(date.toString());
// Example output: "Fri Jun 07 2025 12:02:25 GMT+0530 (India Standard Time)"

Explanation:

JWT iat is in seconds.

JavaScript Date expects milliseconds, so multiply by 1000.

Then Date.toString() prints the local date and time.
*/
        req.doc = token_decode;




        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authDoctor;
