import json
import re

def parse_md_to_json(md_file_path, json_file_path):
    """将 reception.md 文件转换为 JSON 格式"""
    
    with open(md_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 按一级标题分割内容
    sections = re.split(r'^# ', content, flags=re.MULTILINE)
    sections = [s.strip() for s in sections if s.strip()]
    
    result = []
    
    for section in sections:
        lines = section.split('\n')
        title = lines[0].strip()
        body = '\n'.join(lines[1:])
        
        item = {
            'title': title,
            'title_en': '',
            'cn': {
                'staff': '',
                'location': '',
                'description': '',
                'highlight': ''
            },
            'en': {
                'staff': '',
                'location': '',
                'description': '',
                'highlight': ''
            }
        }
        
        # 提取中文部分
        # 工作人员
        staff_match = re.search(r'## 工作人员[：:]\s*\n+(.+?)(?=\n##|\n#|$)', body, re.DOTALL)
        if staff_match:
            item['cn']['staff'] = staff_match.group(1).strip().split('\n')[0].strip()
        
        # 位置
        location_match = re.search(r'## 位置[：:]\s*\n+(.+?)(?=\n##|\n#|$)', body, re.DOTALL)
        if location_match:
            item['cn']['location'] = location_match.group(1).strip().split('\n')[0].strip()
        
        # 场景描述
        desc_match = re.search(r'## 场景(?:化)?描述[：:]\s*\n+(.+?)(?=\n##|\n#|$)', body, re.DOTALL)
        if desc_match:
            item['cn']['description'] = desc_match.group(1).strip()
        
        # 亮点
        highlight_match = re.search(r'## 亮点[：:]\s*\n+(.+?)(?=\n##|\n#|$)', body, re.DOTALL)
        if highlight_match:
            item['cn']['highlight'] = highlight_match.group(1).strip()
        
        # 提取英文部分
        # Personnel
        personnel_match = re.search(r'##\s*Personnel[：:]\s*\n+(.+?)(?=\n##|\n#|$)', body, re.DOTALL)
        if personnel_match:
            item['en']['staff'] = personnel_match.group(1).strip().split('\n')[0].strip()
        
        # Location (英文)
        location_en_match = re.search(r'##\s*Location[：:]\s*\n+(.+?)(?=\n##|\n#|$)', body, re.DOTALL)
        if location_en_match:
            item['en']['location'] = location_en_match.group(1).strip().split('\n')[0].strip()
        
        # Scene description
        scene_match = re.search(r'##\s*Scene(?:ario)?\s*[Dd]escription[：:]\s*\n+(.+?)(?=\n##|\n#|$)', body, re.DOTALL)
        if scene_match:
            item['en']['description'] = scene_match.group(1).strip()
        
        # Highlight (英文)
        highlight_en_match = re.search(r'## Highlight[：:]\s*\n+(.+?)(?=\n##|\n#|$)', body, re.DOTALL)
        if highlight_en_match:
            item['en']['highlight'] = highlight_en_match.group(1).strip()
        
        result.append(item)
    
    # 写入 JSON 文件
    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f'成功将 {md_file_path} 转换为 {json_file_path}')
    print(f'共解析 {len(result)} 个章节')

if __name__ == '__main__':
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    md_path = os.path.join(script_dir, 'reception.md')
    json_path = os.path.join(script_dir, 'reception.json')
    parse_md_to_json(md_path, json_path)
