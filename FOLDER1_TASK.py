import os

def unique_name(path):
    """
    If 'path' already exists, returns a new path by adding _RENAME, _RENAME1, _RENAME2...
    """
    if not os.path.exists(path):
        return path

    base = path + "_RENAME"
    if not os.path.exists(base):
        return base

    count = 1
    while True:
        new_path = f"{base}{count}"
        if not os.path.exists(new_path):
            return new_path
        count += 1


# 1) Desktop path
desktop = os.path.join(os.path.expanduser("~"), "Desktop")

# 2) Main folder: Gen AI (rename if exists)
main_folder = os.path.join(desktop, "Gen AI")
main_folder = unique_name(main_folder)
os.makedirs(main_folder)

# 3) Create 10 subfolders + files
for i in range(1, 11):
    subfolder = os.path.join(main_folder, f"AI Subfolder {i}")
    subfolder = unique_name(subfolder)
    os.makedirs(subfolder)

    # File: SANIKA.txt (rename if exists)
    file_path = os.path.join(subfolder, "SANIKA.txt")
    file_path = unique_name(file_path)

    # Create file and write content
    with open(file_path, "w", encoding="utf-8") as f:
        f.write("HELLO WELCOME TO PYTHON")

print("✅ Done: Folder, subfolders and files created + content written + rename handled!")
print("Main folder created at:", main_folder)
