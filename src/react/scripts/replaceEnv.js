import readFile from "fs/readFile";
import writeFile from "fs/writeFile";

/**
 * This script replaces placeholders in a specified file with environment variables.
 * Placeholders should be in the format: `${VARIABLE_NAME}`
 *
 * Usage:
 *   node replaceEnv <filename>
 *
 * Ensure you set the required environment variables before running the script.
 * If an environment variable is missing, the script will display an error message and exit.
 */

// Check if filename is provided
if (process.argv.length < 3) {
  console.error("Please provide a filename as an argument.");
  process.exit(1);
}

const filename = process.argv[2];

// Read the content of the file
readFile(filename, "utf8", (err, content) => {
  if (err) {
    console.error("Error reading file:", filename, err);
    return;
  }

  // Replace placeholders with environment variables
  const replacedContent = content.replace(/\$\{(.+?)\}/g, (match, envName) => {
    if (!process.env[envName] || process.env[envName] === "") {
      console.error("Missing env variable:", envName);
      process.exit(1);
    }

    return process.env[envName];
  });

  // Write the replaced content back to the file
  writeFile(filename, replacedContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", filename, err);
      return;
    }
  });
});
