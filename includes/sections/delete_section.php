<?php

session_start();

require '../db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo json_encode(['error' => 'User not authenticated']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['sectionId'])) {
        $sectionId = intval($data['sectionId']);
        $userId = $_SESSION['user_id'];

        $stmt = $conn->prepare('DELETE FROM sections WHERE id = ? AND user_id = ?');
        if ($stmt === false) {
            echo json_encode(['error' => 'Failed to prepare SQL statement']);
            exit();
        }

        $stmt->bind_param('ii', $sectionId, $userId);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Section not found']);
        }

        $stmt->close();
    } else {
        echo json_encode(['error' => 'Invalid input']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
