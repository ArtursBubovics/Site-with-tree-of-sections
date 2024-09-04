<?php
session_start();

require '../db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(403); // Forbidden
    echo json_encode(['error' => 'User not authenticated']);
    exit();
}

function getSections($conn, $userId, $parentId = null)
{

    $query = "SELECT id, title, description FROM sections WHERE user_id = ?";
    $params = [$userId];

    if ($parentId === null) {
        $query .= " AND parent_id IS NULL";
    } else {
        $query .= " AND parent_id = ?";
        $params[] = $parentId;
    }


    $stmt = $conn->prepare($query);
    if ($stmt === false) {
        echo json_encode(['error' => 'Failed to prepare SQL statement']);
        exit();
    }

    $paramTypes = str_repeat('i', count($params));
    $stmt->bind_param($paramTypes, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();

    $sections = [];

    while ($row = $result->fetch_assoc()) {
        $section = [
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'children' => getSections($conn, $userId, $row['id'])
        ];
        $sections[] = $section;
    }

    $stmt->close();

    return $sections;
}

$userId = $_SESSION['user_id'];
header('Content-Type: application/json');
echo json_encode(getSections($conn, $userId));
