#!/usr/bin/sh

# ディレクトリとファイルのhash値を取得
TEMP_DIR=temp/

TARGET_DIR=static/
DOCS_FILE=docs.md
SLIDES_FILE=slides.md

FILE_LIST=$TEMP_DIR/files.txt
HASH_LIST=$TEMP_DIR/hash_list.txt
FINAL_HASH=$TEMP_DIR/final_hash.txt

mkdir -p $TEMP_DIR

# ファイルリストを作成
find $TARGET_DIR -type f -print0 | sort -z > $FILE_LIST
printf "%s\0" "$SLIDES_FILE" >> $FILE_LIST
printf "%s\0" "$DOCS_FILE" >> $FILE_LIST

echo "FILE_LIST"
cat $FILE_LIST | tr '\0' '\n'

# 各ファイルのハッシュ値を計算
cat $FILE_LIST | xargs --null sha256sum | sort > $HASH_LIST

echo "HASH_LIST"
cat $HASH_LIST

# 全体のハッシュ値を計算
sha256sum $HASH_LIST | awk '{print $1}' > $FINAL_HASH

echo "FINAL_HASH"
cat $FINAL_HASH