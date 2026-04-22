import fs from 'fs';
const files = [
  'input_file_0.mp4',
  'input_file_0.png',
  'input_file_1.png',
  'input_file_2.png',
  'input_file_3.png',
  'input_file_4.png',
  'public/input_file_0.mp4',
  'public/input_file_0.png',
  'public/input_file_1.png',
  'public/input_file_2.png',
  'public/input_file_3.png',
  'public/input_file_4.png',
  'src/assets/input_file_0.mp4',
  'src/assets/input_file_0.png',
  'src/assets/input_file_1.png',
  'src/assets/input_file_2.png',
  'src/assets/input_file_3.png',
  'src/assets/input_file_4.png',
];

files.forEach(f => {
  console.log(`${f}: ${fs.existsSync(f)}`);
});
