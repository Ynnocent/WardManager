import pdfplumber
import json
import sys

def clean_string(value):
    """Clean and normalize string values"""
    if value is None:
        return ''
    return str(value).strip().replace('\n', ' ').replace('\r', ' ')

def is_header_row(row):
    """Check if this row appears to be a header row"""
    if not row or len(row) == 0:
        return False
    
    first_cell = clean_string(row[0]).lower()
    # Check for common header patterns
    header_indicators = ['name', 'member list', 'individuals', 'count:', 'for church use only']
    return any(indicator in first_cell for indicator in header_indicators)

def is_valid_member_row(row):
    """Check if this row contains valid member data"""
    if not row or len(row) < 6:
        return False
    
    # Skip rows that are clearly not member data
    name = clean_string(row[0])
    if not name or len(name) < 2:
        return False
    
    # Skip footer/header rows
    if any(text in name.lower() for text in ['member list', 'individuals', 'stake', 'ward', 'for church use only', 'count:']):
        return False
    
    return True

def extract_members_from_pdf(pdf_path):
    members = []
    
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Processing PDF with {len(pdf.pages)} pages", file=sys.stderr)
        
        for page_num, page in enumerate(pdf.pages, 1):
            print(f"Processing page {page_num}", file=sys.stderr)
            
            # Try table extraction first
            tables = page.extract_tables()
            
            if tables:
                for table_num, table in enumerate(tables):
                    print(f"Found table {table_num + 1} with {len(table)} rows", file=sys.stderr)
                    
                    for row_num, row in enumerate(table):
                        if is_header_row(row):
                            print(f"Skipping header row: {row[0] if row else 'empty'}", file=sys.stderr)
                            continue
                        
                        if not is_valid_member_row(row):
                            continue
                        
                        # Ensure we have at least 6 columns, pad with empty strings if needed
                        while len(row) < 6:
                            row.append('')
                        
                        member = {
                            "name": clean_string(row[0]),
                            "gender": clean_string(row[1]),
                            "age": clean_string(row[2]),
                            "birthDate": clean_string(row[3]),
                            "phoneNumber": clean_string(row[4]),
                            "email": clean_string(row[5]),
                            "status": "Active",
                            "Organization": "",
                            "talkHistory": [],
                            "prayerHistory": [],
                            "lastPrayer":""
                        }
                        
                        # Only add if name is not empty
                        if member["name"]:
                            members.append(member)
            else:
                # Fallback: try to extract text and parse manually
                print(f"No tables found on page {page_num}, trying text extraction", file=sys.stderr)
                text = page.extract_text()
                if text:
                    # This is a more complex parsing approach for non-tabular data
                    # You might need to implement this based on your specific PDF format
                    pass
    
    print(f"Extracted {len(members)} members total", file=sys.stderr)
    return members

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("PDF path is required", file=sys.stderr)
        sys.exit(1)

    pdf_path = sys.argv[1]
    try:
        data = extract_members_from_pdf(pdf_path)
        # Output the JSON to stdout
        print(json.dumps(data, indent=2))
    except Exception as e:
        print(f"Error processing PDF: {str(e)}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)