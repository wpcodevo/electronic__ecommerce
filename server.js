const path = require('path');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: path.join(__dirname, './config/config.env') });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
