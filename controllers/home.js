/*
 * Npm import
 */

/*
 * Local import
 */


module.exports = function home (req, res) {
  res.send(`
    <div style="margin: 5em auto; width: 400px; line-height: 1.5">
      <h1 style="text-align: center">Server Lauched!</h1>
    </div>
  `);
};
