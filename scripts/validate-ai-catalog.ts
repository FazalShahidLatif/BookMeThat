import fs from 'fs';
import path from 'path';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

async function validate() {
  const schemaPath = path.resolve(process.cwd(), 'scripts', 'ai-catalog.schema.json');
  let schemaContent: string;
  if (fs.existsSync(schemaPath)) {
    schemaContent = fs.readFileSync(schemaPath, 'utf-8');
  } else {
    // Fetch schema if not local
    const res = await fetch('https://raw.githubusercontent.com/ards-project/ard-spec/main/spec/schemas/ai-catalog.schema.json');
    schemaContent = await res.text();
    fs.writeFileSync(schemaPath, schemaContent, 'utf-8');
  }
  const schema = JSON.parse(schemaContent);
  const validateFn = ajv.compile(schema);

  const catalogPath = path.resolve(process.cwd(), 'public', 'ai-catalog.json');
  if (!fs.existsSync(catalogPath)) {
    console.error('public/ai-catalog.json does not exist!');
    process.exit(1);
  }
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

  const valid = validateFn(catalog);
  if (!valid) {
    console.error('Validation FAILED:', validateFn.errors);
    process.exit(1);
  }
  console.log('SUCCESS: ai-catalog.json strictly adheres to ARD schema 1.0!');
}

validate().catch((err) => {
  console.error('Error during validation:', err);
  process.exit(1);
});
