from flask import Flask, jsonify, request
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = []
next_id = 1
ALLOWED_STATUSES = {"pending", "in_progress", "done"}


@app.route('/tasks', methods=['POST'])
def create_task():
    global next_id
    data = request.json

    title = data.get("title")
    description = data.get("description")
    status = data.get("status", "pending")

    if not title or not description:
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    if status not in ALLOWED_STATUSES:
        return jsonify({"error": "Estado inválido"}), 400

    task = {
        "id": next_id,
        "title": title,
        "description": description,
        "status": status,
        "created_at": datetime.utcnow().isoformat() + "Z"
    }
    tasks.append(task)
    next_id += 1
    return jsonify(task), 201


@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks), 200


@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = next((t for t in tasks if t["id"] == task_id), None)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404
    return jsonify(task), 200


@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    task = next((t for t in tasks if t["id"] == task_id), None)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404

    if "title" in data:
        task["title"] = data["title"]
    if "description" in data:
        task["description"] = data["description"]
    if "status" in data:
        if data["status"] not in ALLOWED_STATUSES:
            return jsonify({"error": "Estado inválido"}), 400
        task["status"] = data["status"]

    return jsonify(task), 200


@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    task = next((t for t in tasks if t["id"] == task_id), None)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404

    tasks = [t for t in tasks if t["id"] != task_id]
    return jsonify({"message": "Tarea eliminada"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3245, debug=True)
